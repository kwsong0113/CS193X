// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText, updateScreen, showNextScreen) {
    this.containerElement = containerElement;
    this.updateScreen = updateScreen;
    this.showNextScreen = showNextScreen;

    this._flipCard = this._flipCard.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);

    this.originX = null;
    this.originY = null;
    this.dragStarted = false;

    this._onPointerdown = this._onPointerdown.bind(this);
    this._onPointermove = this._onPointermove.bind(this);
    this._onPointerup = this._onPointerup.bind(this);

    this.containerElement.addEventListener('pointerdown', this._onPointerdown);
    this.containerElement.addEventListener('pointermove', this._onPointermove);
    this.containerElement.addEventListener('pointerup', this._onPointerup);
  }

  _onPointerdown(event) {
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
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
    this.updateScreen(currentState);
  }

  _onPointerup(event) {
    if (!this.dragStarted) {
      return;
    }
    this.dragStarted = false;

    const deltaX = event.clientX - this.originX;
    const currentState = deltaX >= 150 ? 1 : (deltaX <= -150 ? -1 : 0);
    if (currentState == 0) {
      this.updateScreen(currentState);
      event.currentTarget.style.transition = '0.6s';
      event.currentTarget.style.transform = '';
    } else {
      this.showNextScreen(currentState);
    }
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }
}
