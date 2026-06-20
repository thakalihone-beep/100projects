const questions = [
  {
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Text Machine Language', 'Hyper Tool Multi Language', 'Home Tool Markup Language'],
    answer: 0,
  },
  {
    question: 'Which CSS property changes text color?',
    options: ['background-color', 'font-size', 'color', 'margin'],
    answer: 2,
  },
  {
    question: 'Which keyword declares a block-scoped variable?',
    options: ['var', 'let', 'function', 'const'],
    answer: 1,
  },
  {
    question: 'What is the correct way to write a comment in JavaScript?',
    options: ['<!-- comment -->', '# comment', '// comment', '<!-- comment -->'],
    answer: 2,
  },
  {
    question: 'Which HTML tag is used to link CSS?',
    options: ['<script>', '<style>', '<link>', '<html>'],
    answer: 2,
  },
];

const progressEl = document.getElementById('progress');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const q = questions[currentQuestion];
  progressEl.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  answered = false;

  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => selectOption(index));
    optionsEl.appendChild(button);
  });

  nextBtn.textContent = 'Next';
}

function selectOption(index) {
  if (answered) return;

  answered = true;
  const q = questions[currentQuestion];
  const buttons = optionsEl.querySelectorAll('.option-btn');

  buttons.forEach((button, i) => {
    button.classList.remove('selected');
    if (i === q.answer) {
      button.classList.add('correct');
    }
    if (i === index && i !== q.answer) {
      button.classList.add('wrong');
    }
  });

  buttons[index].classList.add('selected');

  if (index === q.answer) {
    score += 1;
  }
}

function nextQuestion() {
  if (!answered) {
    alert('Please select an answer before continuing.');
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    questionEl.textContent = `Quiz complete! You scored ${score} out of ${questions.length}.`;
    progressEl.textContent = 'Final Result';
    optionsEl.innerHTML = '';
    nextBtn.textContent = 'Restart';
    nextBtn.onclick = () => {
      currentQuestion = 0;
      score = 0;
      renderQuestion();
      nextBtn.onclick = nextQuestion;
    };
  }
}

nextBtn.addEventListener('click', nextQuestion);
renderQuestion();
