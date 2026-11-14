(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  function syncState(theme) {
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    try {
      localStorage.setItem('wl-portal-theme', theme);
    } catch {
      // Ignore storage failures
    }
  }

  syncState(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    syncState(current === 'dark' ? 'light' : 'dark');
  });
})();
