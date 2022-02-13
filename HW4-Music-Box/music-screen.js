// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(containerElement, onEndFetching) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.onReadyToLoadImages = this.onReadyToLoadImages.bind(this);
    this.onReadyToLoadAudio = this.onReadyToLoadAudio.bind(this);
    this.onReadyToPlay = this.onReadyToPlay.bind(this);

    this.containerElement = containerElement;
    this.onEndFetching = onEndFetching;

    const gifDisplayElement = document.querySelector('#gif-display');
    this.gifDisplay = new GifDisplay(gifDisplayElement, this.onReadyToLoadImages, this.onReadyToLoadAudio);

    this.audioPlayer = new AudioPlayer(this.onReadyToPlay);

    const playButtonElement = document.querySelector('footer img');
    this.playButton = new PlayButton(playButtonElement, (state) => {
      if (state) {
        this.audioPlayer.pause();
      } else {
        this.audioPlayer.play();
      }
    });

  }
  // TODO(you): Add methods as necessary.
  show(source) {
    this.source = source;
    this.gifDisplay.setTheme(this.source.theme);
  }

  onReadyToLoadImages(fetchingResult) {
    this.onEndFetching(fetchingResult);
    if (fetchingResult) {
      this.gifDisplay.preloadImages();
    }
  }

  onReadyToLoadAudio() {
    this.audioPlayer.setKickCallback(() => { console.log('kick!'); this.gifDisplay.showDifferentGif(); });
    this.audioPlayer.setSong(this.source.song);
  }

  onReadyToPlay() {
    console.log('Start playing');
    const loading = document.querySelector('#loading');
    loading.classList.toggle('inactive');
    this.containerElement.classList.remove('inactive');
    this.audioPlayer.play();
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
