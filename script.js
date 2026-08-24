// ================================
// SPLIT — Question Engine v2
// ================================

const questions = [
  {
    category: "FOOD",
    question: "Fries are better than pizza. Fight me.",
    options: ["Absolutely", "Never"],
    tags: ["food", "opinion"]
  },
  {
    category: "MUSIC",
    question: "Listening to an album in order is better than shuffle.",
    options: ["True", "Cap"],
    tags: ["music", "opinion"]
  },
  {
    category: "LIFE",
    question: "Being left on read for 8 hours is rude.",
    options: ["Yes", "No"],
    tags: ["life", "social"]
  },
  {
    category: "MOVIES",
    question: "The villain was actually right.",
    options: ["Probably", "You're insane"],
    tags: ["movies", "opinion"]
  },
  {
    category: "TECH",
    question: "AI is making the internet more interesting.",
    options: ["Agree", "Not a chance"],
    tags: ["technology", "opinion"]
  },
  {
    category: "RELATIONSHIPS",
    question: "Double texting is completely fine.",
    options: ["Obviously", "Have dignity"],
    tags: ["relationships", "social"]
  },
  {
    category: "FOOD",
    question: "Breakfast food is acceptable at any time of day.",
    options: ["100%", "Absolutely not"],
    tags: ["food", "life"]
  },
  {
    category: "LIFE",
    question: "Staying home on Friday night is better than going out.",
    options: ["Night in", "Go outside"],
    tags: ["life", "social"]
  },
  {
    category: "GAMING",
    question: "Single-player games are better than multiplayer games.",
    options: ["Single-player", "Multiplayer"],
    tags: ["gaming", "opinion"]
  },
  {
    category: "MONEY",
    question: "Saving money is more satisfying than buying something new.",
    options: ["Definitely", "Not really"],
    tags: ["money", "life"]
  }
];

let userVotes = JSON.parse(
  localStorage.getItem("splitVotes") || "{}"
);

function saveVotes() {
  localStorage.setItem(
    "splitVotes",
    JSON.stringify(userVotes)
  );
}

function getPercentage(questionIndex, optionIndex) {
  const key = `${questionIndex}-${optionIndex}`;

  const saved = localStorage.getItem(
    `splitResult-${key}`
  );

  return saved ? Number(saved) : 50;
}

function saveVote(questionIndex, optionIndex) {

  const voteKey = `${questionIndex}`;

  userVotes[voteKey] = optionIndex;

  saveVotes();

  // Demo percentage system.
  // Later this will be replaced with a real database.
  const currentA = getPercentage(questionIndex, 0);

  let newA = currentA;

  if (optionIndex === 0) {
    newA = Math.min(99, currentA + 1);
  } else {
    newA = Math.max(1, currentA - 1);
  }

  localStorage.setItem(
    `splitResult-${questionIndex}-0`,
    newA
  );

  localStorage.setItem(
    `splitResult-${questionIndex}-1`,
    100 - newA
  );
}

function createPoll(question, index) {

  const article = document.createElement("article");

  article.className = "poll";

  const previousVote = userVotes[index];

  const percentageA = getPercentage(index, 0);
  const percentageB = getPercentage(index, 1);

  article.innerHTML = `
    <div class="poll-meta">
      <span>${question.category}</span>
      <span>${1000 + index * 731} votes</span>
    </div>

    <h3>${question.question}</h3>

    <div class="vote">

      <button
        data-option="0"
        style="--w:${percentageA}%"
        ${previousVote !== undefined ? "disabled" : ""}
      >
        <span>${question.options[0]}</span>
      </button>

      <button
        data-option="1"
        style="--w:${percentageB}%"
        ${previousVote !== undefined ? "disabled" : ""}
      >
        <span>${question.options[1]}</span>
      </button>

    </div>

    <div class="status">
      ${
        previousVote !== undefined
          ? `${percentageA}% vs ${percentageB}%`
          : "Tap to vote"
      }
    </div>
  `;

  const buttons = article.querySelectorAll(
    ".vote button"
  );

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const option = Number(
        button.dataset.option
      );

      saveVote(index, option);

      renderQuestions();
    });

  });

  return article;
}

function renderQuestions() {

  const feed = document.getElementById("feed");

  if (!feed) return;

  feed.innerHTML = "";

  questions.forEach((question, index) => {

    feed.appendChild(
      createPoll(question, index)
    );

  });
}

function randomQuestion() {

  const index = Math.floor(
    Math.random() * questions.length
  );

  const question = questions[index];

  alert(
    `${question.category}\n\n${question.question}\n\n` +
    `${question.options[0]}  OR  ${question.options[1]}`
  );
}

function initialize() {

  renderQuestions();

  const refreshButton =
    document.getElementById("refreshBtn");

  if (refreshButton) {

    refreshButton.addEventListener(
      "click",
      renderQuestions
    );

  }

  const randomButton =
    document.getElementById("randomBtn");

  if (randomButton) {

    randomButton.addEventListener(
      "click",
      randomQuestion
    );

  }

}

initialize();
