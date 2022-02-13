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
    this.showAfterFetching = this.showAfterFetching.bind(this);

    this.containerElement = containerElement;
    this.onEndFetching = onEndFetching;
    this.audioPlayer = new AudioPlayer();

    const gifDisplayElement = document.querySelector('#gif-display');
    this.gifDisplay = new GifDisplay(gifDisplayElement, this.showAfterFetching);

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

  showAfterFetching(fetchingResult) {
    this.onEndFetching(fetchingResult);
    if (fetchingResult) {
      this.containerElement.classList.remove('inactive');
      this.audioPlayer.setSong(this.source.song);
      this.audioPlayer.setKickCallback(() => { console.log('kick!'); this.gifDisplay.showDifferentGif(); });
      this.audioPlayer.play();
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
