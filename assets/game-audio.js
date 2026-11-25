const gameAudio = (() => {
  const background = new Audio("assets/audio/murajaah.mp3");
  const narrator = new Audio();
  background.loop = true;
  background.preload = "none";
  narrator.preload = "none";

  const clips = {
    correct: "benar",
    retry: "coba-lagi",
    duelMiss: "duel-keliru"
  };

  function savedPreference(key, fallback) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  }

  let musicOn = savedPreference("hq_music", "off") === "on";
  let narrationOn = savedPreference("hq_narrator", "on") === "on";
  let mushafOpen = false;
  let tilawahPlaying = false;
  let appSuspended = false;

  function updateMusic() {
    if (appSuspended || !musicOn || mushafOpen || tilawahPlaying || !narrator.paused || document.hidden) {
      background.pause();
      return;
    }
    background.play().catch(() => {
      // Saved preferences can only resume after a user gesture on some browsers.
    });
  }

  function syncControls() {
    document.querySelector("#toggle-music").setAttribute("aria-pressed", String(musicOn));
    document.querySelector("#toggle-narrator").setAttribute("aria-pressed", String(narrationOn));
  }

  function toggle(key) {
    if (key === "music") {
      musicOn = !musicOn;
    } else {
      narrationOn = !narrationOn;
      if (!narrationOn) narrator.pause();
    }
    try {
      localStorage.setItem("hq_" + key, (key === "music" ? musicOn : narrationOn) ? "on" : "off");
    } catch {
      // The switches still work for the current session.
    }
    syncControls();
    updateMusic();
  }

  function narrate(result) {
    if (appSuspended || !narrationOn || tilawahPlaying || document.hidden) return;
    narrator.pause();
    background.pause();
    const folder = interfaceLanguage === "id" ? "" : interfaceLanguage + "/";
    narrator.src = `assets/audio/${folder}${clips[result]}.mp3`;
    narrator.play().catch(updateMusic);
  }

  function setTilawah(playing) {
    tilawahPlaying = playing;
    if (playing) narrator.pause();
    updateMusic();
  }

  function changeView(tab) {
    narrator.pause();
    mushafOpen = tab === "mushaf";
    updateMusic();
  }

  function setAppSuspended(suspended) {
    appSuspended = suspended;
    if (suspended) narrator.pause();
    updateMusic();
  }

  function stopNarration() {
    narrator.pause();
    updateMusic();
  }

  narrator.addEventListener("ended", updateMusic);
  narrator.addEventListener("error", updateMusic);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) narrator.pause();
    updateMusic();
  });
  const menu = document.querySelector(".audio-menu");
  document.addEventListener("click", event => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  menu.addEventListener("keydown", event => {
    if (event.key !== "Escape" || !menu.open) return;
    menu.open = false;
    menu.querySelector("summary").focus();
  });
  document.addEventListener("click", updateMusic, { once: true });
  syncControls();

  return { toggle, narrate, setTilawah, changeView, stopNarration, setAppSuspended };
})();
