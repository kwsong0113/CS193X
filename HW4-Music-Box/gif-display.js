// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
//
// See HW4 writeup for more hints and details.
const GIPHY_API_URL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=25&rating=g&q="

class GifDisplay {
  constructor(containerElement, onEndFetching, afterPreloadingTwoImages) {
    this._onJsonReady = this._onJsonReady.bind(this);
    this.showDifferentGif = this.showDifferentGif.bind(this);
    this.preloadImages = this.preloadImages.bind(this);
    this._onLoad = this._onLoad.bind(this);

    this.containerElement = containerElement;
    this.onEndFetching = onEndFetching;
    this.afterPreloadingTwoImages = afterPreloadingTwoImages;

    this.foregroundContainer = containerElement.querySelector('#foreground');
    this.backgroundContainer = containerElement.querySelector('#background');
    this.swap = false;
    this.gifIndex = -1;
    this.images = [];

  }

  setTheme(theme) {
    fetch(GIPHY_API_URL + encodeURIComponent(theme))
      .then((response) => response.json())
      .then(this._onJsonReady);
  }

  _onJsonReady(json) {
    this.gifDatas = json.data;
    const fetchingResult = this.gifDatas.length >= 2;
    this.onEndFetching(fetchingResult);
  }

  preloadImages() {
    console.log('Start loading images');
    this._preloadNextImage();
  }

  _preloadNextImage() {
    const image = new Image();
    image.src = this.gifDatas[this.images.length].images.downsized.url;
    image.addEventListener('load', this._onLoad);
  }

  _onLoad(event) {
    this.images.push(event.currentTarget);
    if (this.images.length == 2) {
      this._renderGif(this.foregroundContainer);
      this._renderGif(this.backgroundContainer);
      this.afterPreloadingTwoImages();
    }
    if (this.images.length < this.gifDatas.length) {
      this._preloadNextImage();
    }
  }

  showDifferentGif() {
    this.containerElement.classList.toggle('swap');
    this.swap = !this.swap;
    this._renderGif(this.swap ? this.foregroundContainer : this.backgroundContainer);
  }

  _getNewGifIndex() {
    let newGifIndex = null;
    do {
      newGifIndex = Math.floor(Math.random() * this.images.length);
    } while (newGifIndex === this.gifIndex);
    this.gifIndex = newGifIndex;
  }

  _renderGif(container) {
    this._getNewGifIndex();
    container.style.backgroundImage = 'url(\'' + this.images[this.gifIndex].src + '\')';
  }
}
