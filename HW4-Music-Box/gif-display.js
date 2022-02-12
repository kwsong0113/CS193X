// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
//
// See HW4 writeup for more hints and details.
const GIPHY_API_URL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=25&rating=g&q="

class GifDisplay {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.gifIndex = -1;

    this._onJsonReady = this._onJsonReady.bind(this);
    this.showDifferentGif = this.showDifferentGif.bind(this);
  }

  setTheme(theme) {
    fetch(GIPHY_API_URL + encodeURIComponent(theme))
      .then((response) => response.json())
      .then(this._onJsonReady);
  }

  _onJsonReady(json) {
    this.gifDatas = json.data;
    this.showDifferentGif();
  }

  showDifferentGif() {
    let newGifIndex = null;
    do {
      newGifIndex = Math.floor(Math.random() * this.gifDatas.length);
    } while (newGifIndex === this.gifIndex);
    this.gifIndex = newGifIndex;
    this._renderGif();
  }

  _renderGif() {
    this.containerElement.style.backgroundImage = 'url(\'' + this.gifDatas[this.gifIndex].images.downsized.url + '\')';
  }
}
