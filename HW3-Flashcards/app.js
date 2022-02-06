// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    this.menuToFlashcard = this.menuToFlashcard.bind(this);
    this.flashcardToResult = this.flashcardToResult.bind(this);
    this.resultToFlashcard = this.resultToFlashcard.bind(this);
    this.resultToMenu = this.resultToMenu.bind(this);

    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement, this.menuToFlashcard);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement, this.flashcardToResult);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement, this.resultToFlashcard, this.resultToMenu);
  }

  menuToFlashcard(deck) {
    this.menu.hide();
    this.flashcards.showNew(deck);
  }

  flashcardToResult(right, wrong) {
    this.flashcards.hide();
    this.results.show(right, wrong);
  }

  resultToFlashcard() {
    this.results.hide();
    this.flashcards.show();
  }

  resultToMenu() {
    this.results.hide();
    this.menu.show();
  }
}
