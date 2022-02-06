// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement, checkedAllFlashcards) {
    this.containerElement = containerElement;
    this.checkedAllFlashcards = checkedAllFlashcards;
    this.words = null;
    this.index = null;
    this.right = null;
    this.wrong = null;

    this._updateScreen = this._updateScreen.bind(this);
    this._showNextScreen = this._showNextScreen.bind(this);

    this.originX = null;
    this.originY = null;
    this.dragStarted = false;

    this._onPointerdown = this._onPointerdown.bind(this);
    this._onPointermove = this._onPointermove.bind(this);
    this._onPointerup = this._onPointerup.bind(this);

    this.flashcardContainer = document.querySelector('#flashcard-container');
    this.flashcardContainer.addEventListener('pointerdown', this._onPointerdown);
    this.flashcardContainer.addEventListener('pointermove', this._onPointermove);
    this.flashcardContainer.addEventListener('pointerup', this._onPointerup);
  }

  show(deck) {
    this.containerElement.classList.remove('inactive');

    this.words = Object.entries(deck.words);
    this.right = this.wrong = this.index = 0;

    this._showNextScreen(0);
    this._updateStatus(this.right, this.wrong);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _onPointerdown(event) {
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;
    event.target.setPointerCapture(event.pointerId);
    event.currentTarget.style.transition = '';
  }

  _onPointermove(event) {
    if (!this.dragStarted) {
      return;
    }
    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    const rotationAngle = 0.2 * deltaX;
    event.currentTarget.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) ' + 'rotate(' + rotationAngle + 'deg)';

    const currentState = deltaX >= 150 ? 1 : (deltaX <= -150 ? -1 : 0);
    this._updateScreen(currentState);
  }

  _onPointerup(event) {
    if (!this.dragStarted) {
      return;
    }
    this.dragStarted = false;

    const deltaX = event.clientX - this.originX;
    const currentState = deltaX >= 150 ? 1 : (deltaX <= -150 ? -1 : 0);
    if (currentState == 0) {
      this._updateScreen(currentState);
      event.currentTarget.style.transition = '0.6s';
      event.currentTarget.style.transform = '';
    } else {
      event.currentTarget.style.transform = '';
      this._showNextScreen(currentState);
    }
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
    } else if (currentState == -1){
      this.wrong++;
    }

    if (this.index < this.words.length) {
      this.flashcardContainer.innerHTML = '';
      const card = new Flashcard(this.flashcardContainer, this.words[this.index][0], this.words[this.index][1]);
      this.index++;
    } else {
      this.checkedAllFlashcards();
    }
  }
}
