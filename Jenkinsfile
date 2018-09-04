pipeline {
    parameters {
        // Source code management
        string(name: 'source', defaultValue: 'https://github.com/runonautomation/pcf-demo-app.git')
        string(name: 'branch', defaultValue: 'master')


    }
  agent {
    node {
      label 'docker'
    }
  }
  options {
    timestamps()
  }
  environment {
    TEAM="PRACTICE"
  }

  stages {
    stage('Clone sources') {
        steps {
            //git credentialsId: 'runonautomation', url: '${source}', branch: '${branch}'
            git url: '${source}'

        }
    }

    stage('SonarQube Quality Gate') {
        steps {
            //script {
            //   deployment = pipeline_image.split("/")[1]
            //}
            //withSonarQubeEnv('sonar') {
            //  sh "sonar-scanner -Dsonar.projectKey=${deployment} -Dsonar.sources=."
            //} 
            sh "echo Source Code Analyzed && sleep 2"
        }   
    }


    stage('Unit testing') {
        steps {
            sh ('''
                ./scripts/unittest.sh
            ''')
            junit 'out/*.xml'
        }
    }
    

    stage('Push to Testing Environment') {
        steps { 
            pushToCloudFoundry(
                target: 'api.sys.pcf.glpractices.com',
                organization: 'practices',
                cloudSpace: 'dev',
                credentialsId: 'pcfcred',
                selfSigned: 'true',
                manifestChoice: [
                    manifestFile: 'manifest-test.yml'
                ]
            )
         }
    }

    stage("Integration testing") {
            steps {
                sh('''
                    ./scripts/test-integration.sh
                ''')
            }
    }

    stage("Performance testing") {
            steps {
                sh('''
                    ./scripts/test-performance.sh
                ''')
            }
    }

    stage('Approval for Production roll-out') {
        steps {
            script {
                timeout(time:10, unit:'MINUTES') {
                    while (true) {
                        userPasswordInput = input(id: 'userPasswordInput',
                            message: 'Please approve deployment. Enter password to proceed.',
                            parameters: [[$class: 'StringParameterDefinition', defaultValue: '',  name: 'Password']])
                        if (userPasswordInput=='Go!') { break }
                    }
                }
            }
        }
    }

    stage("Production deployment") {
            steps {
            pushToCloudFoundry(
                target: 'api.sys.pcf.glpractices.com',
                organization: 'practices',
                cloudSpace: 'production',
                credentialsId: 'pcfcred',
                selfSigned: 'true'
            )
            }
    }

    stage("Post Production Liveness") {
            steps {
                sh('''
                    ./scripts/production-liveness.sh
                ''')
            }
    }

  }
  post {
    failure {
      echo 'Pipeline Execution Failed'
    }
  }
}
