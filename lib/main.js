// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");
// https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/request
var Request = require("sdk/request").Request;
 
// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
	include: ["*.reddit.com"],
	contentScriptFile: self.data.url("synccit.js"),
	onAttach: function(worker) {
		worker.port.on("apiPostRequest", function(opts) {
			opts.onComplete = function(response){
				console.log(response.text);
				worker.port.emit("onApiRequestComplete", response.text);
			};
			Request(opts).post();
		});
	}
});


