const questions = [
  {
    question: 'On which day of the week is the Campus Engagement "Spirit" event actually held?',
    answer: "Thursday"
  },
  {
    question: "What is the name of Coach Alex's son? (Hint: If you don't know, ask someone from the soccer team.)",
    answer: "Tomma"
  },
  {
    question: 'In what year and month was DKU\'s "Never Mind Cafe" opened?',
    answer: "May 2025"
  },
  {
    question: "Which professor regularly performs at Music Night? (Hint: Teaches GCHINA and offers a Bob Dylan-related Mini Term course.)",
    answer: "Professor Andrew Field"
  },
  {
    question: "What is DKU's mascot called?",
    answer: "Blue Dear"
  },
  {
    question: "What is the gender ratio of DKU undergraduate students in Spring 2026?",
    answer: "Female: 58%, Male: 42%"
  },
  {
    question: "Which country's cuisine was featured in the cafeteria this session?",
    answer: "Korean"
  },
  {
    question: "Which student organization hosts Dance Night?",
    answer: "Street Dance Club / Chinese Dance Club / Ballet Club"
  },
  {
    question: "Which Mini Term course became regular 2-credit courses this year?",
    answer: "Forensic Science"
  },
  {
    question: "Which student club is known for having the loudest events?",
    answer: "Any answer should be fine."
  },
  {
    question: "When did the first group of DKU undergraduates begin study abroad at Duke's main campus?",
    answer: "August 2020"
  },
  {
    question: "How many countries did DKU represent in Spring 2026?",
    answer: "65 countries"
  },
  {
    question: "Who is our chancellor? (Full name)",
    answer: "Liu Yaolin"
  },
  {
    question: "When was DKU established?",
    answer: "2013"
  },
  {
    question: "What are the new majors added in 2026?",
    answer: "Quantitative Political Economics, PPE, Behavior Science - Economics Track"
  },
  {
    question: "Which majors are no longer available starting with the Class of 2028?",
    answer: "US Studies, Institutions and Governance"
  }
];

const questionEl = document.querySelector("#question");
const placeholderEl = document.querySelector("#placeholder");
const answerPanelEl = document.querySelector("#answerPanel");
const answerEl = document.querySelector("#answer");
const counterEl = document.querySelector("#counter");
const statusEl = document.querySelector("#status");
const generateBtn = document.querySelector("#generateBtn");
const answerBtn = document.querySelector("#answerBtn");
const copyBtn = document.querySelector("#copyBtn");
const resetBtn = document.querySelector("#resetBtn");

let remainingQuestions = shuffle([...questions]);
let currentItem = null;

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [items[i], items[swapIndex]] = [items[swapIndex], items[i]];
  }
  return items;
}

function updateCounter() {
  const usedCount = questions.length - remainingQuestions.length;
  counterEl.textContent = `${usedCount} / ${questions.length} used`;
}

function setStatus(message) {
  statusEl.textContent = message;
}

function hideAnswer() {
  answerPanelEl.classList.add("hidden");
  answerEl.textContent = "";
  answerBtn.textContent = "Show Answer";
}

function showQuestion(item) {
  currentItem = item;
  placeholderEl.classList.add("hidden");
  questionEl.classList.remove("hidden");
  questionEl.classList.remove("question-enter");
  void questionEl.offsetWidth;
  questionEl.classList.add("question-enter");
  questionEl.textContent = item.question;
  hideAnswer();
  answerBtn.disabled = false;
  copyBtn.disabled = false;
}

function generateQuestion() {
  if (remainingQuestions.length === 0) {
    setStatus("All questions have been used. Reset to reshuffle the deck.");
    generateBtn.disabled = true;
    return;
  }

  const nextQuestion = remainingQuestions.pop();
  showQuestion(nextQuestion);
  updateCounter();

  if (remainingQuestions.length === 0) {
    setStatus("That was the last question in the set.");
    generateBtn.disabled = true;
  } else {
    setStatus("Questions will not repeat until reset.");
  }
}

async function copyCurrentQuestion() {
  if (!currentItem) {
    return;
  }

  try {
    await navigator.clipboard.writeText(currentItem.question);
    setStatus("Question copied to clipboard.");
  } catch (error) {
    setStatus("Copy failed in this browser. You can still select the text manually.");
  }
}

function toggleAnswer() {
  if (!currentItem) {
    return;
  }

  const isHidden = answerPanelEl.classList.contains("hidden");

  if (isHidden) {
    answerEl.textContent = currentItem.answer;
    answerPanelEl.classList.remove("hidden");
    answerBtn.textContent = "Hide Answer";
    setStatus("Answer revealed.");
    return;
  }

  hideAnswer();
  setStatus("Answer hidden.");
}

function resetGenerator() {
  remainingQuestions = shuffle([...questions]);
  currentItem = null;
  generateBtn.disabled = false;
  answerBtn.disabled = true;
  copyBtn.disabled = true;
  questionEl.textContent = "";
  questionEl.classList.add("hidden");
  placeholderEl.classList.remove("hidden");
  hideAnswer();
  updateCounter();
  setStatus("Questions reset and reshuffled.");
}

generateBtn.addEventListener("click", generateQuestion);
answerBtn.addEventListener("click", toggleAnswer);
copyBtn.addEventListener("click", copyCurrentQuestion);
resetBtn.addEventListener("click", resetGenerator);

updateCounter();
