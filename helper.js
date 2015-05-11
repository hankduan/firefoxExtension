var q = require('q');
var FirefoxProfile = require('firefox-profile');

exports.getFirefoxProfile = function(extensionPath) {
  var deferred = q.defer();

  var firefoxProfile = new FirefoxProfile();
  firefoxProfile.addExtensions([extensionPath], function() {
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
