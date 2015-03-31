var q = require('q');
var FirefoxProfile = require('firefox-profile');

exports.getFirefoxProfile = function() {
  var deferred = q.defer();

  var firefoxProfile = new FirefoxProfile();
  firefoxProfile.addExtensions(['/workspace/ffprofiler/ffperf-addon/ffperf-addon.xpi'], function() {
    // dev env: '/workspace/ffprofiler/ffperf-addon/devprefs-1.3-tb+fx.xpi', 
    // firefoxProfile.setPreference('extensions.sdk.console.logLevel', 'all');
    // firefoxProfile.setPreference('javascript.options.showInConsole', 'true');
    // firefoxProfile.setPreference('devtools.chrome.enabled', 'true');
    // firefoxProfile.setPreference('devtools.debugger.remote-enabled', 'true');
    firefoxProfile.encoded(function(encodedProfile) {
      var multiCapabilities = [{
        browserName: 'firefox',
        firefox_profile : encodedProfile
      }];
      deferred.resolve(multiCapabilities);
    });
  });

  return deferred.promise;
};
