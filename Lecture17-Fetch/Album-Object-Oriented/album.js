class Album {
  constructor(containerElement, imageUrl) {
    const image = new Image();;
    image.src = imageUrl;
    containerElement.append(image);
  }
}
