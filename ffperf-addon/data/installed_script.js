exportFunction(function() {
  self.port.emit('measurePerformance');
}, unsafeWindow, {defineAs: "measurePerformance"});
