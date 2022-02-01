const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
  if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE') {
    return;
  }
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = transformTextContent(node.textContent);
  }
  for (const child of node.childNodes) {
    transformTextNodes(child);
  }
}

function transformTextContent(content) {
  const splitContent = content.split(/[ \n]/);
  for (let i = 0; i < splitContent.length; i++) {
    const word = splitContent[i];
    if (word in MATCH_LIST) {
      splitContent[i] = MATCH_LIST[word];
    }
  }
  return splitContent.join(' ');
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension updated');
