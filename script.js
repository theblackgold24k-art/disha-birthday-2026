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
