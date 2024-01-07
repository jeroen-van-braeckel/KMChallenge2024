function copyToClipboard() {
    var codeInput = document.getElementById("access-code");
    codeInput.select();
    document.execCommand("copy");
  }