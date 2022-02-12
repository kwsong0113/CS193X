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
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.audioPlayer = new AudioPlayer();

    const gifDisplayElement = document.querySelector('#gif-display');
    this.gifDisplay = new GifDisplay(gifDisplayElement);

    this.playButton = new PlayButton();
  }
  // TODO(you): Add methods as necessary.
  show(source) {
    this.containerElement.classList.remove('inactive');
    this.gifDisplay.setTheme(source.theme);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
