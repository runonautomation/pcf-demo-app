 #!/bin/bash
 set -e
 set -x
 TS=`date "+%Y%m%d-%H%M%S"`
docker build -t pcf-demo-app$TS .
CID=$(docker run -d pcf-demo-app$TS npm run test)
mkdir -p out
rm -rf ./out/*
docker cp $CID:/tmp/testreport.xml out