(() => {
  const dialog = document.getElementById("opening");
  const start = document.getElementById("opening-play");
  const skip = document.getElementById("opening-skip");
  const status = document.getElementById("opening-status");
  const firstPhrase = document.getElementById("opening-taawudz");
  const secondPhrase = document.getElementById("opening-basmala");
  const audio = new Audio("assets/audio/pembuka-alafasy.mp3");
  audio.preload = "none";
  // Basmalah starts at 6.3 seconds in this recording.
  const basmalaStart = 6.3;

  function highlightPhrase() {
    const isBasmala = audio.currentTime >= basmalaStart;
    firstPhrase.classList.toggle("is-current", !isBasmala);
    secondPhrase.classList.toggle("is-current", isBasmala);
  }

  function showPlaybackError() {
    if (!dialog.open || !start.disabled) return;
    audio.pause();
    start.disabled = false;
    start.textContent = tr("Coba Putar Lagi");
    status.textContent = tr("Bacaan belum bisa diputar. Coba lagi atau pilih Lewati.");
    firstPhrase.classList.remove("is-current");
    secondPhrase.classList.remove("is-current");
    start.focus();
  }

  async function playOpening() {
    if (!dialog.open || start.disabled) return;
    start.disabled = true;
    status.textContent = tr("Memutar bacaan Mishary Alafasy…");
    skip.focus();
    if (audio.error) audio.load();
    audio.currentTime = 0;
    try {
      await audio.play();
      if (dialog.open) highlightPhrase();
    } catch (error) {
      if (error.name !== "NotAllowedError") {
        showPlaybackError();
        return;
      }
      if (!dialog.open) return;
      start.disabled = false;
      status.textContent = tr("Ketuk Mulai dengan Bacaan untuk menyalakan suara.");
      start.focus();
    }
  }

  start.addEventListener("click", playOpening);
  skip.addEventListener("click", () => dialog.close());
  audio.addEventListener("timeupdate", highlightPhrase);
  audio.addEventListener("error", showPlaybackError);
  audio.addEventListener("ended", () => dialog.close());
  dialog.addEventListener("close", () => {
    audio.pause();
    gameAudio.setAppSuspended(false);
    document.getElementById("app-title").focus({ preventScroll: true });
  });

  gameAudio.setAppSuspended(true);
  dialog.showModal();
  void playOpening();
})();
