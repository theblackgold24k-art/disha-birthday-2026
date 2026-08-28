/* =========================================
   DISHRA BIRTHDAY WEBSITE
   COMPLETE JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================
     PAGE NAVIGATION
     ===================================== */

  const pages = document.querySelectorAll(".page");
  const nextButtons = document.querySelectorAll("[data-next]");

  let currentPage = 1;

  function showPage(pageNumber) {

    if (!pages.length) return;

    pages.forEach(function (page) {
      page.classList.remove("active");
    });

    const target = document.querySelector(
      '.page[data-page="' + pageNumber + '"]'
    );

    if (target) {
      target.classList.add("active");
      currentPage = pageNumber;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  nextButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      const nextPage = parseInt(
        button.getAttribute("data-next"),
        10
      );

      if (!isNaN(nextPage)) {
        showPage(nextPage);
      }

    });

  });


  /* =====================================
     YES / NO QUESTION
     ===================================== */

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const answerMessage =
    document.getElementById("answerMessage");

  if (yesBtn) {

    yesBtn.type = "button";

    yesBtn.addEventListener("click", function (event) {

      event.preventDefault();

      if (answerMessage) {

        answerMessage.innerHTML =
          "I knew it. 🥹❤️<br>" +
          "Then let's make a lifetime of memories together. ✨";

        answerMessage.style.display = "block";
      }

      yesBtn.innerHTML = "YES ❤️";
      yesBtn.disabled = true;

      if (noBtn) {
        noBtn.style.display = "none";
      }

      heartBurst(30);

    });

  }


  if (noBtn) {

    noBtn.type = "button";

    noBtn.addEventListener("click", function (event) {

      event.preventDefault();

      if (answerMessage) {

        answerMessage.innerHTML =
          "Nice try 🙈😂<br>" +
          "You don't get to escape that easily. ❤️";

        answerMessage.style.display = "block";
      }

      noBtn.style.position = "fixed";

      const maxX =
        Math.max(10, window.innerWidth - 150);

      const maxY =
        Math.max(80, window.innerHeight - 100);

      const randomX =
        Math.floor(Math.random() * maxX);

      const randomY =
        Math.floor(Math.random() * maxY);

      noBtn.style.left = randomX + "px";
      noBtn.style.top = randomY + "px";

    });

  }


  /* =====================================
     PUZZLE
     ===================================== */

  const puzzle = document.getElementById("puzzle");

  const puzzleDisplay =
    document.getElementById("puzzleDisplay");

  const checkPuzzle =
    document.getElementById("checkPuzzle");

  const resetPuzzle =
    document.getElementById("resetPuzzle");

  const puzzleResult =
    document.getElementById("puzzleResult");

  const correctWord = "DISHRA";

  const puzzleLetters =
    ["D", "I", "S", "H", "R", "A"];

  let selectedLetters = [];


  function updatePuzzleDisplay() {

    if (!puzzleDisplay) return;

    if (selectedLetters.length === 0) {

      puzzleDisplay.textContent =
        "_ _ _ _ _ _";

    } else {

      puzzleDisplay.textContent =
        selectedLetters.join(" ");

    }
  }


  function createPuzzle() {

    if (!puzzle) return;

    puzzle.innerHTML = "";

    selectedLetters = [];

    if (puzzleResult) {
      puzzleResult.style.display = "none";
      puzzleResult.innerHTML = "";
    }

    const shuffled =
      [...puzzleLetters].sort(
        function () {
          return Math.random() - 0.5;
        }
      );

    shuffled.forEach(function (letter) {

      const button =
        document.createElement("button");

      button.type = "button";
      button.className = "puzzle-letter";
      button.textContent = letter;

      button.addEventListener("click", function (event) {

        event.preventDefault();

        if (
          button.classList.contains("selected")
        ) {
          return;
        }

        button.classList.add("selected");

        selectedLetters.push(letter);

        updatePuzzleDisplay();

      });

      puzzle.appendChild(button);

    });

    updatePuzzleDisplay();
  }


  /* =====================================
     CHECK PUZZLE
     ===================================== */

  if (checkPuzzle) {

    checkPuzzle.type = "button";

    checkPuzzle.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        const answer =
          selectedLetters.join("");

        if (answer === correctWord) {

          if (puzzleResult) {

            puzzleResult.innerHTML =
              "🎉 Perfect! You spelled DISHRA! ❤️<br>" +
              "Our favourite little word. 🥹";

            puzzleResult.style.display = "block";
          }

          heartBurst(25);

        } else {

          if (puzzleResult) {

            puzzleResult.innerHTML =
              "Almost... 👀❤️<br>" +
              "Try arranging the letters again.";

            puzzleResult.style.display = "block";
          }

        }

      }
    );

  }


  /* =====================================
     RESET PUZZLE
     ===================================== */

  if (resetPuzzle) {

    resetPuzzle.type = "button";

    resetPuzzle.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        createPuzzle();

      }
    );

  }

  createPuzzle();


  /* =====================================
     CONTINUOUS FLOATING HEARTS
     ===================================== */

  const heartsContainer =
    document.getElementById("hearts");

  function createFloatingHeart() {

    if (!heartsContainer) return;

    const heart =
      document.createElement("span");

    heart.className = "floating-heart";

    const symbols = ["♡", "♥", "♡", "♥"];

    heart.textContent =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.fontSize =
      (16 + Math.random() * 25) + "px";

    heart.style.animationDuration =
      (5 + Math.random() * 4) + "s";

    heart.style.color =
      Math.random() > 0.5
        ? "#ff9dca"
        : "#ffffff";

    heartsContainer.appendChild(heart);

    setTimeout(function () {

      if (heart.parentNode) {
        heart.remove();
      }

    }, 10000);
  }


  /* Start floating hearts */

  for (let i = 0; i < 12; i++) {

    setTimeout(
      createFloatingHeart,
      i * 250
    );

  }

  /* Continue forever */

  setInterval(
    createFloatingHeart,
    650
  );


  /* =====================================
     HEART BURST
     ===================================== */

  function heartBurst(amount) {

    for (let i = 0; i < amount; i++) {

      const heart =
        document.createElement("span");

      heart.className = "burst-heart";
      heart.textContent = "❤️";

      heart.style.left =
        "50%";

      heart.style.top =
        "50%";

      heart.style.setProperty(
        "--x",
        Math.random()
      );

      heart.style.setProperty(
        "--y",
        Math.random()
      );

      document.body.appendChild(heart);

      setTimeout(function () {

        if (heart.parentNode) {
          heart.remove();
        }

      }, 1400);

    }

  }


  /* =====================================
     CLICK HEART EFFECT
     ===================================== */

  document.addEventListener(
    "click",
    function (event) {

      /* Don't create extra heart when
         clicking puzzle letters */

      if (
        event.target.classList.contains(
          "puzzle-letter"
        )
      ) {
        return;
      }

      /* Don't create extra heart when
         clicking any button */

      if (
        event.target.tagName === "BUTTON" ||
        event.target.closest("button")
      ) {
        return;
      }

      const heart =
        document.createElement("span");

      heart.textContent = "♡";

      heart.style.position = "fixed";

      heart.style.left =
        event.clientX + "px";

      heart.style.top =
        event.clientY + "px";

      heart.style.color =
        "#ff91c7";

      heart.style.fontSize =
        "20px";

      heart.style.pointerEvents =
        "none";

      heart.style.zIndex =
        "9999";

      heart.style.transition =
        "transform 1s ease, opacity 1s ease";

      document.body.appendChild(heart);

      setTimeout(function () {

        heart.style.transform =
          "translateY(-60px) scale(1.5)";

        heart.style.opacity =
          "0";

      }, 20);

      setTimeout(function () {

        if (heart.parentNode) {
          heart.remove();
        }

      }, 1100);

    }
  );


  /* =====================================
     KEYBOARD NAVIGATION
     ===================================== */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "ArrowRight") {

        const next =
          document.querySelector(
            '.page[data-page="' +
            (currentPage + 1) +
            '"]'
          );

        if (next) {
          showPage(currentPage + 1);
        }

      }


      if (event.key === "ArrowLeft") {

        const previous =
          document.querySelector(
            '.page[data-page="' +
            (currentPage - 1) +
            '"]'
          );

        if (previous) {
          showPage(currentPage - 1);
        }

      }

    }
  );


  /* =====================================
     INITIAL PAGE
     ===================================== */

  if (pages.length) {

    const alreadyActive =
      document.querySelector(
        ".page.active"
      );

    if (!alreadyActive) {
      showPage(1);
    }

  }

});
