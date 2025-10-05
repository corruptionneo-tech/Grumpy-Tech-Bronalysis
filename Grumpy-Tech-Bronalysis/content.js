(async function() {
  const url = 'https://raw.githubusercontent.com/twinforces/grok-prompts/refs/heads/Less-Woke/bias_correction.j2'; // Replace with your actual GitHub raw URL

  let textToPaste;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    textToPaste = await response.text();
    textToPaste += ' Analyze the following url: '; // Appended fixed text
  } catch (error) {
    alert(`Failed to fetch text from ${url}: ${error.message}`);
    return;
  }

  // Read clipboard and append
  try {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
      textToPaste += ` ${clipboardText}`; // Append clipboard contents (with space for separation)
    } else {
      alert('Clipboard is empty; pasting without it.');
    }
  } catch (error) {
    alert(`Failed to read clipboard: ${error.message}. Pasting without it.`);
  }

  const activeElement = document.activeElement;

  if (!activeElement) {
    alert('No active element found to paste into.');
    return;
  }

  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    activeElement.value = activeElement.value.substring(0, start) + textToPaste + activeElement.value.substring(end);
    activeElement.selectionStart = activeElement.selectionEnd = start + textToPaste.length;
    // Trigger 'input' event to notify any listeners of the change
    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
  } else if (activeElement.isContentEditable) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(textToPaste));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      activeElement.innerHTML += textToPaste;
    }
    // Trigger 'input' event for contenteditable
    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    alert('Focus on an editable field (input, textarea, or contenteditable) to paste.');
    return;
  }

  // Simulate Enter key press to submit
  ['keydown', 'keypress', 'keyup'].forEach(type => {
    const enterEvent = new KeyboardEvent(type, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      which: 13,
      bubbles: true,
      cancelable: true
    });
    activeElement.dispatchEvent(enterEvent);
  });
})();