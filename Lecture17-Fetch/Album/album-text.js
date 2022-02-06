function onTextReady(text) {
  const albumStrings = text.split('\n\n');
  const albums = [];
  for (const infoText of albumStrings) {
    const infoStrings = infoText.split('\n');
    albums.push({
      name: infoStrings[0],
      year: parseInt(infoStrings[1]),
      url: infoStrings[2]
    });
  }
  // Sort albums by year
  albums.sort(function(a, b) {
    return a.year - b.year;
  });
  // Add album images to body
  for (const album of albums) {
    const image = new Image();
    image.src = album.url;
    document.body.append(image);
  }
}

function onResponse(response) {
  return response.text();
}

fetch('albums.txt')
  .then(onResponse)
  .then(onTextReady);
