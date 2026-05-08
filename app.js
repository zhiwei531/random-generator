const questions = [
  'On which day of the week is the Campus Engagement "Spirit" event actually held?',
  "What is the name of Coach Alex's son? (Hint: If you don't know, ask someone from the soccer team.)",
  'In what year and month was DKU\'s "Never Mind Cafe" opened?',
  "Which professor regularly performs at Music Night? (Hint: Teaches GCHINA and offers a Bob Dylan-related Mini Term course.)",
  "What is DKU's mascot called?",
  "What is the gender ratio of DKU undergraduate students in Spring 2026?",
  "Which country's cuisine was featured in the cafeteria this session?",
  "Which student organization hosts Dance Night?",
  "Which Mini Term course became regular 2-credit courses this year?",
  "Which student club is known for having the loudest events?",
  "When did the first group of DKU undergraduates begin study abroad at Duke's main campus?",
  "How many countries did DKU represent in Spring 2026?",
  "Who is our chancellor? (Full name)",
  "When was DKU established?",
  "What are the new majors added in 2026?",
  "Which majors are no longer available starting with the Class of 2028?"
];

const questionEl = document.querySelector("#question");
const placeholderEl = document.querySelector("#placeholder");
const counterEl = document.querySelector("#counter");
const statusEl = document.querySelector("#status");
const generateBtn = document.querySelector("#generateBtn");
const copyBtn = document.querySelector("#copyBtn");
const resetBtn = document.querySelector("#resetBtn");

let remainingQuestions = shuffle([...questions]);
let currentQuestion = "";

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

function showQuestion(question) {
  currentQuestion = question;
  placeholderEl.classList.add("hidden");
  questionEl.classList.remove("hidden");
  questionEl.classList.remove("question-enter");
  void questionEl.offsetWidth;
  questionEl.classList.add("question-enter");
  questionEl.textContent = question;
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
  if (!currentQuestion) {
    return;
  }

  try {
    await navigator.clipboard.writeText(currentQuestion);
    setStatus("Question copied to clipboard.");
  } catch (error) {
    setStatus("Copy failed in this browser. You can still select the text manually.");
  }
}

function resetGenerator() {
  remainingQuestions = shuffle([...questions]);
  currentQuestion = "";
  generateBtn.disabled = false;
  copyBtn.disabled = true;
  questionEl.textContent = "";
  questionEl.classList.add("hidden");
  placeholderEl.classList.remove("hidden");
  updateCounter();
  setStatus("Questions reset and reshuffled.");
}

generateBtn.addEventListener("click", generateQuestion);
copyBtn.addEventListener("click", copyCurrentQuestion);
resetBtn.addEventListener("click", resetGenerator);

updateCounter();
