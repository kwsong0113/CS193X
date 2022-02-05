// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement, onMenuClicked) {
    this.containerElement = containerElement;
    this.choiceContainer = document.querySelector('#choices');
    this.onMenuClicked = onMenuClicked;

    for (const deck of FLASHCARD_DECKS) {
      this._addMenuItems(deck)
    }
  }

  _addMenuItems(deck) {
    const menuItem = document.createElement('div');
    menuItem.textContent = deck.title;
    menuItem.addEventListener('pointerup', () => this.onMenuClicked(deck));

    this.choiceContainer.appendChild(menuItem);
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
