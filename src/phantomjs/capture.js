/* global phantom Webpage: true */
var system = require('system');
var fs = require('fs');
var page = new WebPage();
var url = system.args[1];
var output = system.args[2];

page.open(url, function (status) {
  var result;
  var rendered;
  if (status !== 'success') {
    console.log('FAILED to load the url');
    phantom.exit();
  } else {
    result = page.evaluate(function () {
      var html;
      var doc;
      html = document.querySelector('html');
      return html.outerHTML;
    });

    if (output) {
      rendered = fs.open(output, 'w');
      rendered.write(result);
      rendered.flush();
      rendered.close();
    } else {
      console.log(result);
    }
  }
  phantom.exit();
});
