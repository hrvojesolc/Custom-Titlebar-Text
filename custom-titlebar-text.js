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

// Compose new document title
var docTitleNew = "ff - " + domain + " - " + docTitleOld + " - " + url;

// Replace document title with new
document.title = docTitleNew;

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  var color = "blue";
  if (item.color) {
    color = item.color;
  }
  document.body.style.border = "10px solid " + color;
}

var getting = browser.storage.local.get("color");
getting.then(onGot, onError);
