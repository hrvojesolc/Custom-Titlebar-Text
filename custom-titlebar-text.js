/*
 * Custom Titlebar Text
 *
 * Mozilla Firefox add-on lets you customize the
 * titlebar text according to a rule. This changes
 * the active window title and is useful for
 * auto-type programs such as KeePass for entering
 * correct account credentials.
 *
 * Source code: https://github.com/hrvojesolc/Custom-Titlebar-Text
 * Add-on listing: https://addons.mozilla.org/firefox/addon/custom-titlebar-text
 *
 */

// Set debug variable to true to enable console logging
var debug = false;

// Debug logging
if (debug) {
  console.log('Debugging enabled.');
}

// Error handling function
function onError(error) {
  console.log(`Error: ${error}`);
}

// Get current document title after page loads
var currentDocumentTitle = document.title;

// Debug logging
if (debug) {
  console.log('Got current document title: ' + currentDocumentTitle);
}

// Default variables
var SelectedFormat = 'Default';
var CustomFormat = '{PageTitle}';

// Load current extension preference
var GetSelectedFormat = browser.storage.local.get('SelectedFormat');
GetSelectedFormat.then(loadSelectedFormat, onError);

// Execute based on extension preferences
function loadSelectedFormat(result) {

  // Load current extension preference into a variable
  var loadedSelectedFormat = result.SelectedFormat || 'Default';

  // Debug logging
  if (debug) {
    console.log('Tried to restore "loadedSelectedFormat" value: ' + loadedSelectedFormat);
  }

  // If preference was Custom, perform variable substitutions based on custom format specified
  if (loadedSelectedFormat == 'Custom') {

    // Load current extension preference into a variable
    var GetCustomFormat = browser.storage.local.get('CustomFormat');
    GetCustomFormat.then(loadCustomFormat, onError);

    // Execute based on custom format preference
    function loadCustomFormat(result) {

      // Variable for new document title
      var newDocumentTitle = '';

      // Load current extension preference into a variable
      var loadedCustomFormat = result.CustomFormat || '{PageTitle}';

      // Debug logging
      if (debug) {
        console.log('Tried to restore "loadedCustomFormat" value: ' + loadedCustomFormat);
      }

      // Perform substitutions for '{PageTitle}' in initial loadedCustomFormat variable
      newDocumentTitle = loadedCustomFormat.replace('{PageTitle}', currentDocumentTitle);

      // Perform substitution for '{PageUrl}' with full URL of page
      newDocumentTitle = newDocumentTitle.replace('{PageUrl}', window.location.href);

      // Perform substitution for '{PageDomain}'
      newDocumentTitle = newDocumentTitle.replace('{PageDomain}', convertUrlToDomain(window.location.href));

      // Set new document title
      document.title = newDocumentTitle;

    }

  // If preference was not Custom, process defaults
  } else {

    // Leave default document title (do nothing).
    // This isn't necessary and could be removed in future.
    document.title = currentDocumentTitle;

  }

}

// Function to convert URL to a subdomain (this is oversimplified and may not work on international TLDs)
function convertUrlToDomain(url, subdomain) {

    subdomain = subdomain || false;

    url = url.replace(/(https?:\/\/)?(www.)?/i, '');

    if (!subdomain) {
        url = url.split('.');

        url = url.slice(url.length - 2).join('.');
    }

    if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
    }

    return url;

}
