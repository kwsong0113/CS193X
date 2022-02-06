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

    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement, this.menuToFlashcard);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement, this.flashcardToResult);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
  }

  menuToFlashcard(deck) {
    this.menu.hide();
    this.flashcards.show(deck);
  }

  flashcardToResult() {
    this.flashcards.hide();
    this.results.show();
  }
}
