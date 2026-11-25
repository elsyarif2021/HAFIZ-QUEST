(() => {
  const button = document.getElementById("install-app");
  const guide = document.getElementById("install-guide");
  let installPrompt = null;
  const installed = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  function syncButton() {
    button.hidden = installed();
  }
  syncButton();

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
  });
  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    button.hidden = true;
    if (guide.open) guide.close();
  });

  button.addEventListener("click", async () => {
    if (installed()) {
      syncButton();
      return;
    }
    const prompt = installPrompt;
    installPrompt = null;
    if (prompt) {
      try {
        await prompt.prompt();
        return;
      } catch {
        // The browser can invalidate a deferred prompt. Show its manual path.
      }
    }
    guide.showModal();
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(error => {
        console.warn("Hafiz Quest service worker:", error);
      });
    });
  }
})();
