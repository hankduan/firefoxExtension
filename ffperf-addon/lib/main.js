var buttons = require('sdk/ui/button/action');
var { setTimeout } = require("sdk/timers");
var file = require('sdk/io/file');
var {Cc,Ci,Cu} = require("chrome");


function Profiler() {
  this._profiler = Cc["@mozilla.org/tools/profiler;1"].getService(Ci.nsIProfiler);
};

Profiler.prototype = {
  _profiler_start: function (entries, interval, features, threads) {
    // helper function to accommodate different versions of nsIProfiler::StartProfiler
    if (threads.length) {
      try {
        this._profiler.StartProfiler(entries, interval, features, features.length, threads, threads.length);
        return;
      } catch (e) {
        console.log('error: ' + e.toString())
      }
    }
    this._profiler.StartProfiler(entries, interval, features, features.length);
  },
  start: function profiler_start(entries, interval, features, threads, cb) {
    this._profiler_start(entries, interval, features, threads);
    if (cb) cb();
  },
  stop: function profiler_stop(cb) {
    this._profiler.StopProfiler();
    // this.gcStats.clear();
    if (cb) cb();
  },
  getProfile: function profiler_getProfile(cb) {
    let profile = this._profiler.getProfileData();
    if (cb) {
      cb(profile);
    }
  }
};

function saveToFile(savePath, str) {
  var textWriter = file.open(savePath, 'w');
  textWriter.write(str);
  textWriter.close();
}

function doGlobalGC() {
  Cu.forceGC();
  var os = Cc["@mozilla.org/observer-service;1"]
            .getService(Ci.nsIObserverService);
  os.notifyObservers(null, "child-gc-request", null);
}

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: measurePerformance
});

var profiler = new Profiler();
function measurePerformance() {
  profiler.start(10000, 1, ['leaf', 'js', 'gc'], '', function() {
    console.log('started');
  });
  
  setTimeout(function() {
    profiler.getProfile(function(profile) {
      console.log('stopped')
      saveToFile('~/Desktop/HANK.json', JSON.stringify(profile, null, 2));
      console.log('saved');
      profiler.stop();
    });
  }, 10000);
}

var mod = require("sdk/page-mod");
var data = require("sdk/self").data;
mod.PageMod({
  include: ['*'],
  contentScriptFile: data.url("installed_script.js"),
  onAttach: function(worker) {
    worker.port.on('measurePerformance', function() {
      measurePerformance();
    });
  }
});
