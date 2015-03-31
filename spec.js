describe('setting firefox profile', function() {
  it ('should measure performance', function() {
    browser.sleep(3000); // wait 3s for extension to load

    browser.driver.get('http://www.angularjs.org');
    browser.executeScript('window.foo()');
    browser.sleep(15000); // wait for it to finish
  })
});
