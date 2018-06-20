// Initialize CloudFoundry Integration
var cf_app = require( '../src/vcap')

// Init helper libraries
var chai = require('chai')
var expect = chai.expect;

describe("Test Cloud Foundry Integration", function() {

    describe("Test VCP integration", function() {
        it("can get VCAP application name", function() {
            process.env.VCAP_APPLICATION = '{"name": "pcf-demo-app"}'
            expect(cf_app.getAppName()).to.equal("pcf-demo-app");
        });

        it("can get VCAP Database credentials", function() {
            process.env.VCAP_SERVICES = '{"p.mysql": [{"credentials": {"name": "test"}}]}'
            expect(cf_app.getDbCredentials().name).to.equal("test");
        });
        
    });

  });