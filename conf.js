var helper = require('./helper.js');

var EXTENSION_PATH = 'ffperf-addon/ffperf-addon.xpi';
// Where to save profile results (parent folder must exist)
var PROFILE_SAVE_PATH = '~/Desktop/fflog/perfProfile.json';

exports.config = {
  directConnect: true,

  specs: ['spec.js'],

  jasmineNodeOpts: {defaultTimeoutInterval: 100000},

  getMultiCapabilities: helper.getFirefoxProfile.bind(null, EXTENSION_PATH),

  params: {
    profileSavePath: PROFILE_SAVE_PATH
  },
};
