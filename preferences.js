// Set debug variable to true to enable console logging
var debug = false;

// Function to save preferences
function savePreferences(e) {

  // Prevent triggering default events
  e.preventDefault();

  // Store value preference of currently checked radio button
  browser.storage.local.set({
    SelectedFormat: document.querySelector('#preferences input[type="radio"]:checked').value,
    CustomFormat: document.querySelector('#CustomFormat').value
  });

  // Debug logging
  if (debug) {
    console.log('Tried to save value: ' + document.querySelector('#preferences input[type="radio"]:checked').value);
    console.log('Tried to save value: ' + document.querySelector('#CustomFormat').value);
  }

}

// Function to restore preferences (when they are displayed)
function restorePreferences() {

  // Temporary variable to track if custom preference is checked
  var isCustomChecked = false;

  // Sub-function to restore current preference selection if one was previously set
  function setSelectedFormat(result) {

    // Load saved radio selection preference or "Default" if it wasn't previously set
    var loadedSelectedFormat = result.SelectedFormat || 'Default';

    // Debug logging
    if (debug) {
      console.log('Tried to restore "loadedSelectedFormat" value: ' + loadedSelectedFormat);
    }

    // Get all the elements (radio buttons)
    var elements = document.getElementsByName('SelectedFormat');

    // Parse through all elements (radio buttons)
    for (var i = 0; i < elements.length; i++) {

      // Check a radio button if it's value matches current preference selection
      if (elements[i].value == loadedSelectedFormat) { elements[i].checked = true; }

      // Check a radio button if it's value matches current preference selection
      if (elements[i].checked == true && elements[i].value == 'Custom') {
        isCustomChecked = true;
      }

    }

    // Debug logging
    if (debug) {
      console.log('Tried to restore selection for preference name: ' + loadedSelectedFormat);
    }

    // Disable or enable custom fields depending if custom preference is current preference or not
    if (isCustomChecked) {
      enableCustom();
    } else {
      disableCustom();
    }

  }

  // Sub-function to restore current preference selection if one was previously set
  function setCustomFormat(result) {

    // Load saved radio selection preference or "Default" if it wasn't previously set
    var loadedCustomFormat = result.CustomFormat || '{PageTitle} - {PageUrl}';

    // Populate CustomFormat textbox with loaded data
    document.querySelector('#CustomFormat').value = loadedCustomFormat;

    // Debug logging
    if (debug) {
      console.log('Tried to restore "loadedCustomFormat" value: ' + loadedCustomFormat);
    }

  }

  // Error handling function
  function onError(error) {
    console.log(`Error: ${error}`);
  }

  // Load current extension preferences
  var GetSelectedFormat = browser.storage.local.get('SelectedFormat');
  var GetCustomFormat = browser.storage.local.get('CustomFormat');

  // Try to set
  GetSelectedFormat.then(setSelectedFormat, onError);
  GetCustomFormat.then(setCustomFormat, onError);

}

// Function to restore preferences (when they are displayed)
function changePreferences() {

  // Temporary variable to track if custom preference is checked
  var isCustomChecked = false;

  // Debug logging
  if (debug) {
    console.log('Preference change has been triggered by user.');
  }

  // Get all the elements (radio buttons)
  var elements = document.getElementsByName('SelectedFormat');

  // Parse through all elements (radio buttons)
  for (var i = 0; i < elements.length; i++) {

    // Check a radio button if it's value matches current preference selection
    if (elements[i].checked == true && elements[i].value == 'Custom') {
      isCustomChecked = true;
    }

  }

  // Disable or enable custom fields depending if custom preference is current preference or not
  if (isCustomChecked) {
    enableCustom();
  } else {
    disableCustom();
  }

}

// Function to enable custom property when radio button is selected
function enableCustom() {

  // Debug logging
  if (debug) {
    console.log('Enabling custom fields because custom preference is checked.');
  }

  document.getElementById('CustomFormat').disabled = false;
  document.getElementById('CustomVariable').disabled = false;

}

// Function to disable ductom property when radio button is deselected
function disableCustom() {

  // Debug logging
  if (debug) {
    console.log('Disabling custom fields because custom preference is not checked.');
  }

  document.getElementById('CustomFormat').disabled = true;
  document.getElementById('CustomVariable').disabled = true;

}

// Function to append a custom variable to custom textbox
function appendVariable() {

  // Get the current value of the custom format text box to be apended
  var currentValue = document.querySelector('#CustomFormat').value;

  // Update the custom format text box with existing value plus appended selected value from a drop-down
  // ONLY IF VALID SELECTION IS MADE
  if (document.getElementById('CustomVariable').value != 'NOT_SELECTED') {
    document.querySelector('#CustomFormat').value = currentValue + document.getElementById('CustomVariable').value;
  }

  // Debug logging
  if (debug) {
    console.log('Appended custom variable to custom format text box.');
  }

}

// Restore current preferences after loading
document.addEventListener('DOMContentLoaded', restorePreferences);

// Save preferences when submit button is clicked
document.querySelector('form').addEventListener('submit', savePreferences);

// Check if custom preference has been set or unset then handle the event
document.querySelector('form').addEventListener('change', changePreferences);

// Append custom preference event handler on selection change
document.getElementById('CustomVariable').addEventListener('change', appendVariable);
