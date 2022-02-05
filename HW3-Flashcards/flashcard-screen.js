// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.right = 0;
    this.wrong = 0;

    this._updateScreen = this._updateScreen.bind(this);
    this._showNextScreen = this._showNextScreen.bind(this);
  }

  show() {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    const card = new Flashcard(flashcardContainer, 'word', 'definition', this._updateScreen, this._showNextScreen);
    this._updateStatus(this.right, this.wrong);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _updateScreen(currentState) {
    if (currentState) {
      document.body.style.backgroundColor = '#97b7b7';
    } else {
      document.body.style.backgroundColor = '#d0e6df';
    }
    this._updateStatus(this.right + (currentState === 1), this.wrong + (currentState === -1));
  }

  _updateStatus(right, wrong) {
    this.containerElement.querySelector('.correct').textContent = right;
    this.containerElement.querySelector('.incorrect').textContent = wrong;
  }

  _showNextScreen(currentState) {
    if (currentState == 1) {
      this.right++;
    } else {
      this.wrong++;
    }

    // TODO: show next card or show result (0205)
  }
}
