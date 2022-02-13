// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.menuToMusic = this.menuToMusic.bind(this);
    this.onReturn = this.onReturn.bind(this);

    const menuElement = document.querySelector('#menu');
    this.menuScreen = new MenuScreen(menuElement, this.menuToMusic);

    const musicElement = document.querySelector('#music');
    this.musicScreen = new MusicScreen(musicElement, this.onReturn);
  }
  // TODO(you): Add methods as necessary.
  menuToMusic(menuResult) {
    this.musicScreen.show(menuResult);
  }

  onReturn(success) {
    if (success) {
      this.menuScreen.hide();
    } else {
      this.menuScreen.displayErrorMessage();
    }
  }
}
