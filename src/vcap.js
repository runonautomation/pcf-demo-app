// app-specific environment variables
module.exports = {
    getAppName: function () {
      if ( process.env.VCAP_APPLICATION) {
        var app_info = JSON.parse( process.env.VCAP_APPLICATION)
        return app_info.name
      }
    },
  
    getAppUris: function () {
      if ( process.env.VCAP_APPLICATION) {
        var app_info = JSON.parse( process.env.VCAP_APPLICATION)
        return app_info.uris.join(', ')
      }
    },
  
    getServiceData: function () {
        var svc_info = JSON.parse(process.env.VCAP_SERVICES)
        return svc_info
    },

    getDbCredentials: function() {
        return this.getServiceData()["p.mysql"][0].credentials
    }
    
  }
