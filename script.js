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


// ================================
// POLL SYSTEM
// ================================

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

  const currentA = getPercentage(
    questionIndex,
    0
  );

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

  const feed =
    document.getElementById("feed");

  if (!feed) return;

  feed.innerHTML = "";

  questions.forEach(
    (question, index) => {

      feed.appendChild(
        createPoll(question, index)
      );

    }
  );
}

function randomQuestion() {

  const index = Math.floor(
    Math.random() * questions.length
  );

  const question =
    questions[index];

  alert(
    `${question.category}\n\n` +
    `${question.question}\n\n` +
    `${question.options[0]}  OR  ` +
    `${question.options[1]}`
  );
}


// ================================
// REFRESH BUTTON
// ================================

const refreshButton =
  document.getElementById("refreshBtn");

if (refreshButton) {

  refreshButton.addEventListener(
    "click",
    () => {

      renderQuestions();

      const trending =
        document.getElementById(
          "trending"
        );

      if (trending) {
        trending.scrollIntoView({
          behavior: "smooth"
        });
      }

    }
  );

}


// ================================
// SURPRISE ME
// ================================

const randomButton =
  document.getElementById("randomBtn");

if (randomButton) {

  randomButton.addEventListener(
    "click",
    () => {

      const games =
        document.getElementById("games");

      if (games) {

        games.scrollIntoView({
          behavior: "smooth"
        });

      }

      const choiceResult =
        document.getElementById(
          "choiceResult"
        );

      if (choiceResult) {

        choiceResult.textContent =
          "Surprise: pick one. No overthinking.";

      }

    }
  );

}


// ================================
// THIS OR THAT
// ================================

const choices =
  document.querySelectorAll(
    "#choice button"
  );

choices.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const result =
        document.getElementById(
          "choiceResult"
        );

      if (result) {

        result.textContent =
          `You picked: ${button.textContent}. Defend your choice.`;

      }

    }
  );

});


// ================================
// HOT TAKE
// ================================

const takes = [
  "“Brunch is just breakfast with better PR.”",
  "“Voice notes longer than 2 minutes are podcasts.”",
  "“The best part of a concert is the 10 seconds you film.”",
  "“Group chats are 90% memes and 10% emergency services.”"
];

let takeIndex = 0;

const takeElement =
  document.getElementById("take");

const rateButtons =
  document.querySelectorAll(
    "[data-rate]"
  );

rateButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const result =
        document.getElementById(
          "takeResult"
        );

      if (result) {

        result.textContent =
          `You rated it ${button.dataset.rate}/4. Very scientific.`;

      }

    }
  );

});

setInterval(() => {

  if (!takeElement) return;

  takeIndex =
    (takeIndex + 1) % takes.length;

  takeElement.textContent =
    takes[takeIndex];

}, 5000);


// ================================
// RANK IT
// ================================

let foods = [
  "Ramen",
  "Pizza",
  "Fries",
  "Ice cream"
];

const rankList =
  document.getElementById(
    "rankList"
  );

function drawRank() {

  if (!rankList) return;

  rankList.innerHTML = "";

  foods.forEach(
    (food, index) => {

      const item =
        document.createElement(
          "div"
        );

      item.className =
        "rank-item";

      item.draggable = true;

      item.innerHTML = `
        <b>${index + 1}</b>
        <span>${food}</span>
      `;

      item.addEventListener(
        "dragstart",
        event => {

          event.dataTransfer.setData(
            "text/plain",
            index
          );

        }
      );

      item.addEventListener(
        "dragover",
        event => {

          event.preventDefault();

        }
      );

      item.addEventListener(
        "drop",
        event => {

          const from =
            Number(
              event.dataTransfer.getData(
                "text/plain"
              )
            );

          const to = index;

          [
            foods[from],
            foods[to]
          ] = [
            foods[to],
            foods[from]
          ];

          drawRank();

        }
      );

      rankList.appendChild(item);

    }
  );
}

drawRank();

const rankButton =
  document.getElementById(
    "rankBtn"
  );

if (rankButton) {

  rankButton.addEventListener(
    "click",
    () => {

      const result =
        document.getElementById(
          "rankResult"
        );

      if (result) {

        result.textContent =
          `Locked: ${foods.join(" → ")}`;

      }

    }
  );

}


// ================================
// CREATE / SUBMIT IDEA
// ================================

const ideaForm =
  document.getElementById(
    "ideaForm"
  );

if (ideaForm) {

  ideaForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const message =
        document.getElementById(
          "ideaMsg"
        );

      if (message) {

        message.textContent =
          "Idea saved in this demo. Connect a database to collect real submissions.";

      }

      ideaForm.reset();

    }
  );

}


// ================================
// SHARE SPLIT
// ================================

const shareButton =
  document.getElementById(
    "shareHero"
  );

if (shareButton) {

  shareButton.addEventListener(
    "click",
    async () => {

      try {

        await navigator.clipboard.writeText(
          location.href
        );

        alert(
          "Link copied."
        );

      } catch {

        alert(
          "Copy this page URL to share it."
        );

      }

    }
  );

}


// ================================
// START
// ================================

renderQuestions();
