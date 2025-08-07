// Store scores in memory
let scores = { 1: 0, 2: 0, 3: 0 };

// Function to change score
function changeScore(player, change) {
  scores[player] += change;
  document.getElementById(`score${player}`).textContent = scores[player];

  // Add a small animation effect
  const scoreElement = document.getElementById(`score${player}`);
  scoreElement.style.transform = "scale(1.1)";
  setTimeout(() => {
    scoreElement.style.transform = "scale(1)";
  }, 150);
}

// Function to reset individual score
function resetScore(player) {
  scores[player] = 0;
  document.getElementById(`score${player}`).textContent = scores[player];

  // Add reset animation
  const scoreElement = document.getElementById(`score${player}`);
  scoreElement.style.color = "#ff7b82";
  setTimeout(() => {
    scoreElement.style.color = "#f0f6fc";
  }, 300);
}

// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
  // Don't trigger shortcuts when typing in label inputs
  if (event.target.classList.contains("score-label")) return;

  switch (event.key) {
    case "q":
      changeScore(1, 1);
      break;
    case "a":
      changeScore(1, -1);
      break;
    case "w":
      changeScore(2, 1);
      break;
    case "s":
      changeScore(2, -1);
      break;
    case "e":
      changeScore(3, 1);
      break;
    case "d":
      changeScore(3, -1);
      break;
    case "r":
      resetScore(1);
      resetScore(2);
      resetScore(3);
      break;
  }
});

// Add smooth transitions for score display
document.querySelectorAll(".score-display").forEach((element) => {
  element.style.transition = "transform 0.15s ease, color 0.3s ease";
});

// Save labels to localStorage
document.querySelectorAll(".score-label").forEach((input, index) => {
  const player = index + 1;

  // Load saved label
  const savedLabel = localStorage.getItem(`scoreLabel${player}`);
  if (savedLabel) {
    input.value = savedLabel;
  }

  // Save label on change
  input.addEventListener("input", function () {
    localStorage.setItem(`scoreLabel${player}`, this.value);
  });
});

// Load saved scores
function loadScores() {
  for (let player = 1; player <= 3; player++) {
    const savedScore = localStorage.getItem(`score${player}`);
    if (savedScore !== null) {
      scores[player] = parseInt(savedScore);
      document.getElementById(`score${player}`).textContent = scores[player];
    }
  }
}

// Save scores to localStorage
function saveScores() {
  for (let player = 1; player <= 3; player++) {
    localStorage.setItem(`score${player}`, scores[player]);
  }
}

// Override changeScore to save scores
const originalChangeScore = changeScore;
changeScore = function (player, change) {
  originalChangeScore(player, change);
  saveScores();
};

// Override resetScore to save scores
const originalResetScore = resetScore;
resetScore = function (player) {
  originalResetScore(player);
  saveScores();
};

// Load scores on page load
loadScores();
