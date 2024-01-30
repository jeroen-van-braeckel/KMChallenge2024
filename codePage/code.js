
    // Function to extract code parameter from URL
    function getCodeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code') || '';
      }
  
      // Function to set code value in the text field
      function setCodeValue() {
        const codeInput = document.getElementById("access-code");
        const codeValue = getCodeFromURL();
        codeInput.value = codeValue;
      }
  
      // Function to copy code to clipboard
      function copyToClipboard() {
        const codeInput = document.getElementById("access-code");
        codeInput.select();
        document.execCommand("copy");
      }
  
      // Call setCodeValue when the page loads
      window.onload = setCodeValue;