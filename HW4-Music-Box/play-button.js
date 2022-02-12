// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
const PLAY_BUTTON_URL = 'images/play.png';
const PAUSE_BUTTON_URL = 'images/pause.png';

class PlayButton {
  constructor(containerElement, onPlayButtonClick) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.containerElement = containerElement;
    this.onPlayButtonClick = onPlayButtonClick;
    this.state = true;

    this._toggleState = this._toggleState.bind(this);
    this.containerElement.addEventListener('click', this._toggleState);
  }

  // TODO(you): Add methods as necessary.
  _toggleState() {
    this.containerElement.src = this.state ? PLAY_BUTTON_URL : PAUSE_BUTTON_URL;
    this.onPlayButtonClick(this.state);
    this.state = !this.state;
  }
}
