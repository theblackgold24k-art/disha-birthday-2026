// ===============================
// DISHRA BIRTHDAY WEBSITE
// Interactive Script
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // PAGE NAVIGATION
  // -------------------------------

  const pages = document.querySelectorAll(".page");
  const nextButtons = document.querySelectorAll("[data-next]");

  let currentPage = 1;

  function showPage(pageNumber) {
    pages.forEach(page => {
      page.classList.remove("active");
    });

    const targetPage = document.querySelector(
      `.page[data-page="${pageNumber}"]`
    );

    if (targetPage) {
      targetPage.classList.add("active");
      currentPage = pageNumber;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  nextButtons.forEach(button => {
    button.addEventListener("click", () => {
      const nextPage = Number(button.dataset.next);

      if (nextPage) {
        showPage(nextPage);
      }
    });
  });


  // -------------------------------
  // YES / NO QUESTION
  // -------------------------------

  const yesButton = document.querySelector("#yesBtn");
  const noButton = document.querySelector("#noBtn");
  const answerMessage = document.querySelector("#answerMessage");

  if (yesButton) {
    yesButton.addEventListener("click", () => {

      if (answerMessage) {
        answerMessage.innerHTML =
          "I knew it. 🥹❤️<br>Then let's make a lifetime of memories together. ✨";
        answerMessage.style.display = "block";
      }

      createHearts(25);

      yesButton.innerHTML = "YES ❤️";
      yesButton.disabled = true;

      if (noButton) {
        noButton.style.display = "none";
      }
    });
  }


  if (noButton) {

    noButton.addEventListener("click", () => {

      if (answerMessage) {
        answerMessage.innerHTML =
          "Nice try 🙈😂<br>You don't get to escape that easily. ❤️";
        answerMessage.style.display = "block";
      }

      // Make the NO button move around
      const maxX = Math.max(20, window.innerWidth - 180);
      const maxY = Math.max(20, window.innerHeight - 120);

      noButton.style.position = "fixed";
      noButton.style.left =
        Math.floor(Math.random() * maxX) + "px";
      noButton.style.top =
        Math.floor(Math.random() * maxY) + "px";
    });

  }


  // -------------------------------
  // DISHRA PUZZLE
  // -------------------------------

  const puzzleContainer =
    document.querySelector("#puzzle");

  const checkButton =
    document.querySelector("#checkPuzzle");

  const resetButton =
    document.querySelector("#resetPuzzle");

  const puzzleResult =
    document.querySelector("#puzzleResult");


  let selectedLetters = [];

  // Correct word
  const correctWord = "DISHRA";

  // Letters
  const letters = ["D", "I", "S", "H", "R", "A"];


  function createPuzzle() {

    if (!puzzleContainer) return;

    puzzleContainer.innerHTML = "";

    selectedLetters = [];

    if (puzzleResult) {
      puzzleResult.innerHTML = "";
      puzzleResult.style.display = "none";
    }

    // Shuffle letters
    const shuffled = [...letters].sort(
      () => Math.random() - 0.5
    );

    shuffled.forEach(letter => {

      const button = document.createElement("button");

      button.className = "puzzle-letter";
      button.textContent = letter;

      button.addEventListener("click", () => {

        if (button.classList.contains("selected")) {
          return;
        }

        button.classList.add("selected");

        selectedLetters.push(letter);

        button.style.opacity = "0.5";
        button.style.transform = "scale(0.9)";

        updatePuzzleDisplay();
      });

      puzzleContainer.appendChild(button);
    });

    updatePuzzleDisplay();
  }


  function updatePuzzleDisplay() {

    const display =
      document.querySelector("#puzzleDisplay");

    if (!display) return;

    if (selectedLetters.length === 0) {
      display.textContent = "_ _ _ _ _ _";
    } else {

      display.textContent =
        selectedLetters.join(" ");
    }
  }


  // CHECK BUTTON

  if (checkButton) {

    checkButton.addEventListener("click", () => {

      const answer = selectedLetters.join("");

      if (answer === correctWord) {

        if (puzzleResult) {
          puzzleResult.innerHTML =
            "🎉 Perfect! You spelled DISHRA! ❤️<br>Our favourite little word. 🥹";
          puzzleResult.style.display = "block";
        }

        createHearts(20);

      } else {

        if (puzzleResult) {
          puzzleResult.innerHTML =
            "Almost... 👀❤️<br>Try arranging the letters again.";
          puzzleResult.style.display = "block";
        }

      }

    });

  }


  // RESET BUTTON

  if (resetButton) {

    resetButton.addEventListener("click", () => {
      createPuzzle();
    });

  }


  // Start puzzle
  createPuzzle();


  // -------------------------------
  // HEART ANIMATION
  // -------------------------------

  function createHearts(amount = 10) {

    for (let i = 0; i < amount; i++) {

      const heart = document.createElement("div");

      heart.innerHTML = "❤️";

      heart.style.position = "fixed";
      heart.style.left =
        Math.random() * 100 + "vw";

      heart.style.bottom = "-30px";

      heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

      heart.style.pointerEvents = "none";

      heart.style.zIndex = "9999";

      heart.style.transition =
        "transform 3s ease-out, opacity 3s ease-out";

      document.body.appendChild(heart);

      setTimeout(() => {

        heart.style.transform =
          `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;

        heart.style.opacity = "0";

      }, 50);

      setTimeout(() => {
        heart.remove();
      }, 3200);

    }

  }


  // -------------------------------
  // CLICK HEART EFFECT
  // -------------------------------

  document.addEventListener("click", event => {

    const heart = document.createElement("span");

    heart.textContent = "❤️";

    heart.style.position = "fixed";
    heart.style.left = event.clientX + "px";
    heart.style.top = event.clientY + "px";

    heart.style.pointerEvents = "none";
    heart.style.fontSize = "18px";
    heart.style.zIndex = "9999";

    heart.style.transition =
      "transform 1s ease, opacity 1s ease";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform =
        "translateY(-60px) scale(1.5)";
      heart.style.opacity = "0";
    }, 20);

    setTimeout(() => {
      heart.remove();
    }, 1100);

  });


  // -------------------------------
  // KEYBOARD SUPPORT
  // -------------------------------

  document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {

      const nextPage =
        document.querySelector(
          `[data-page="${currentPage + 1}"]`
        );

      if (nextPage) {
        showPage(currentPage + 1);
      }

    }

    if (event.key === "ArrowLeft") {

      const previousPage =
        document.querySelector(
          `[data-page="${currentPage - 1}"]`
        );

      if (previousPage) {
        showPage(currentPage - 1);
      }

    }

  });

});
