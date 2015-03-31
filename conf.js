var helper = require('./helper.js');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'spec.js'
  ],

  jasmineNodeOpts: {defaultTimeoutInterval: 100000},

  getMultiCapabilities: helper.getFirefoxProfile
};
