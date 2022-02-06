// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement, onContinueButtonClicked, onToMenuButtonClicked) {
    this.containerElement = containerElement;
    containerElement.querySelector('button.continue').addEventListener('pointerup', onContinueButtonClicked);
    containerElement.querySelector('button.to-menu').addEventListener('pointerup', onToMenuButtonClicked);
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
    this.containerElement.querySelector('.percent').textContent = Math.round(100 * numberCorrect / (numberCorrect + numberWrong));
    this.containerElement.querySelector('.correct').textContent = numberCorrect;
    this.containerElement.querySelector('.incorrect').textContent = numberWrong;
    this.containerElement.querySelector('button.continue').textContent = numberWrong === 0 ? 'Start over?' : 'Continue';
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
