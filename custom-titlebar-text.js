/*

Rewrites document.title to the following format

"ff - {domainName} - {originalDocumentTitle} - {fullUrl}"

*/

// Get current document title after page loads
var docTitleOld = document.title;

// Get the domain of the document
var domain = window.location.hostname;

// Get path and full URL of the document
var pathname = window.location.pathname;
var url = window.location.href;

function onError(error) {
  console.log(`Error: ${error}`);
}

var selectedFormat = "Default1";

function onGot(item) {
  var selectedFormat = "Default2";
  if (item.selectedFormat) {
    selectedFormat = item.selectedFormat;
  }
  //document.body.style.border = "10px solid " + color;
}

var getting = browser.storage.local.get("selectedFormat");
getting.then(onGot, onError);

// Compose new document title
var docTitleNew = "ff - " + selectedFormat + " - " + domain + " - " + url;

// Replace document title with new
document.title = docTitleNew;
