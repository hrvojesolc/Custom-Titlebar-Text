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
