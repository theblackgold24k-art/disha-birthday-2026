(() => {
  "use strict";

  const pages = [...document.querySelectorAll(".page")];
  const progress = document.getElementById("progressBar");
  const hearts = document.getElementById("hearts");
  const musicToggle = document.getElementById("musicToggle");
  const toast = document.getElementById("toast");
  let current = 1;
  let audioCtx = null;
  let ambientTimer = null;
  let audioOn = false;

  function showPage(number, updateHash = true) {
    current = Math.max(1, Math.min(pages.length, number));
    pages.forEach(page => page.classList.toggle("active", Number(page.dataset.page) === current));
    progress.style.width = `${(current / pages.length) * 100}%`;
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (updateHash) history.replaceState(null, "", `#page-${current}`);
    if (current === pages.length) burst(34);
  }

  document.querySelectorAll("[data-next]").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = Number(btn.dataset.next);
      showPage(next);
      burst(10);
    });
  });

  function createHeart() {
    const el = document.createElement("span");
    el.className = "floating-heart";
    el.textContent = Math.random() > .35 ? "♡" : "♥";
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${12 + Math.random() * 22}px`;
    el.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
    el.style.animationDuration = `${6 + Math.random() * 7}s`;
    hearts.appendChild(el);
    setTimeout(() => el.remove(), 14000);
  }
  setInterval(createHeart, 900);

  function burst(count = 20) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "floating-heart";
      el.textContent = ["♥","♡","✦","✧"][Math.floor(Math.random()*4)];
      el.style.left = `${45 + (Math.random() * 10)}%`;
      el.style.bottom = `${30 + Math.random() * 20}%`;
      el.style.fontSize = `${14 + Math.random() * 20}px`;
      el.style.setProperty("--drift", `${-220 + Math.random() * 440}px`);
      el.style.animationDuration = `${2 + Math.random() * 2}s`;
      hearts.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }
  }

  // Lightweight ambient tone: no external audio file is required.
  function startAmbient() {
    if (audioOn) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const master = audioCtx.createGain();
      master.gain.value = 0.025;
      master.connect(audioCtx.destination);

      const notes = [261.63, 329.63, 392.00, 329.63, 293.66, 349.23, 440.00, 349.23];
      let i = 0;
      const playNote = () => {
        if (!audioOn) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.value = notes[i++ % notes.length];
        gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.045, audioCtx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);
        osc.connect(gain).connect(master);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.9);
      };
      audioOn = true;
      musicToggle.classList.add("active");
      playNote();
      ambientTimer = setInterval(playNote, 1500);
    } catch (_) {
      audioOn = false;
    }
  }

  function stopAmbient() {
    audioOn = false;
    musicToggle.classList.remove("active");
    if (ambientTimer) clearInterval(ambientTimer);
    ambientTimer = null;
    if (audioCtx) {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
  }

  musicToggle.addEventListener("click", () => {
    if (audioOn) stopAmbient();
    else startAmbient();
  });

  // The browser requires a user gesture before audio can start.
  document.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    if (!audioOn) {
      startAmbient();
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    }
  }, { once: true });

  const initial = Number((location.hash.match(/page-(\d+)/) || [])[1]);
  showPage(Number.isFinite(initial) && initial >= 1 && initial <= pages.length ? initial : 1, false);
})();

/* ============================= */
/* YES / NO QUESTION */
/* ============================= */

function answerQuestion(answer) {

  const message = document.getElementById("answerMessage");

  if (answer === "yes") {

    message.innerHTML =
      "I knew it. 🥹❤️ You just made my day.";

    message.style.color = "#ff78b7";

  } else {

    message.innerHTML =
      "Nice try 😂 You can't escape that easily. ❤️";

    message.style.color = "#ffffff";
  }
}


/* ============================= */
/* DISHRA PUZZLE */
/* ============================= */

let selectedLetters = [];
let selectedButtons = [];

function selectLetter(button) {

  // Already selected?
  if (button.classList.contains("selected")) {
    return;
  }

  selectedLetters.push(button.innerText);
  selectedButtons.push(button);

  button.classList.add("selected");

  updateWord();
}


function updateWord() {

  const word = selectedLetters.join(" ");

  document.getElementById("builtWord").innerText =
    word || "_ _ _ _ _ _";
}


function checkPuzzle() {

  const message = document.getElementById("puzzleMessage");
  const card = document.querySelector(".puzzle-card");

  const answer = selectedLetters.join("").toUpperCase();

  if (answer === "DISHRA") {

    message.innerHTML =
      "Perfect! 🥹❤️ You found DISHRA.";

    message.style.color = "#ff78b7";

    card.classList.add("success");

    // Little hearts
    createHearts();

  } else {

    message.innerHTML =
      "Hmm... not quite 😭 Try again.";

    message.style.color = "#ffffff";
  }
}


function resetPuzzle() {

  selectedLetters = [];
  selectedButtons = [];

  document
    .querySelectorAll("#puzzleLetters button")
    .forEach(button => {
      button.classList.remove("selected");
    });

  document.getElementById("builtWord").innerText =
    "_ _ _ _ _ _";

  document.getElementById("puzzleMessage").innerText = "";
}


/* ============================= */
/* HEARTS EFFECT */
/* ============================= */

function createHearts() {

  for (let i = 0; i < 15; i++) {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    heart.style.zIndex = "9999";
    heart.style.pointerEvents = "none";

    document.body.appendChild(heart);

    heart.animate(
      [
        {
          transform: "translateY(0) scale(1)",
          opacity: 1
        },
        {
          transform:
            `translateY(-${300 + Math.random() * 400}px)
             translateX(${Math.random() * 100 - 50}px)
             scale(0.5)`,
          opacity: 0
        }
      ],
      {
        duration: 1800 + Math.random() * 1000,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      heart.remove();
    }, 3000);
  }
}
