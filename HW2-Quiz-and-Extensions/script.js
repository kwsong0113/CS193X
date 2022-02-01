// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

const CHECKED = "images/checked.png";
const UNCHECKED = "images/unchecked.png";

function onClick() {
  const container = event.currentTarget;
  const gridBoxes = document.querySelectorAll('[data-question-id = ' + container.dataset.questionId + ']');
  for (const box of gridBoxes) {
    if (box === container) {
      choose(box);
    } else {
      unchoose(box)
    }
  }
  choices[container.dataset.questionId] = container.dataset.choiceId;
  checkQuizComplete();
}

function choose(box) {
  box.classList.remove('unchosen');
  box.classList.add('chosen');
  box.querySelector('img.checkbox').src = CHECKED;
}

function unchoose(box) {
  box.classList.remove('chosen');
  box.classList.add('unchosen');
  box.querySelector('img.checkbox').src = UNCHECKED;
}

function checkQuizComplete() {
  if (Object.keys(choices).length === 3) {
    for (const box of boxes) {
      box.removeEventListener('click', onClick);
    }
    showResult();
  }
}

function showResult() {
  const result = document.querySelector('section.result');
  result.style.display = 'block';
  const choice1 = choices['one'];
  const choice2 = choices['two'];
  const choice3 = choices['three'];
  let choiceResult;
  if (choice2 === choice3) {
    choiceResult = choice2;
  } else {
    choiceResult = choice1;
  }
  const resultText = RESULTS_MAP[choiceResult];
  result.querySelector('h1').textContent = "You got: " + resultText['title'];
  result.querySelector('p').textContent = resultText['contents'];
}

function restartQuiz() {
  choices = {};
  for (const box of boxes) {
    box.classList.remove('chosen');
    box.classList.remove('unchosen');
    box.querySelector('img.checkbox').src = UNCHECKED;
    box.addEventListener('click', onClick);
  }
  event.currentTarget.parentNode.style.display = 'none';
    document.querySelector('article').scrollIntoView({behavior: 'smooth'});
}

let choices = {};
const boxes = document.querySelectorAll('.choice-grid div');
const restartButton = document.querySelector('.result button');
for (const box of boxes) {
  box.addEventListener('click', onClick);
}
restartButton.addEventListener('click', restartQuiz);
