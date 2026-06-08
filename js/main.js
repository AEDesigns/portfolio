document.getElementById('year').textContent = new Date().getFullYear();

// --- Project detail panels (expand/collapse) ---
const announcer = document.getElementById('project-announcer');

document.querySelectorAll('[data-opens-dialog]').forEach((button) => {
  // ensure accessibility attributes
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', button.dataset.opensDialog);

  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.opensDialog);
    if (!panel) return;
    const isOpen = !panel.hasAttribute('hidden');
    const projectName = panel.querySelector('h3')?.textContent || 'Project details';

    // close other panels
    document.querySelectorAll('.project-panel').forEach((p) => {
      if (p !== panel) {
        p.setAttribute('hidden', '');
        const b = document.querySelector(`[data-opens-dialog="${p.id}"]`);
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });

    if (isOpen) {
      panel.setAttribute('hidden', '');
      button.setAttribute('aria-expanded', 'false');
      if (announcer) announcer.textContent = `${projectName} closed.`;
      button.focus();
    } else {
      panel.removeAttribute('hidden');
      button.setAttribute('aria-expanded', 'true');
      if (announcer) announcer.textContent = `${projectName} opened. Use Escape or the Close button to exit.`;
      const closeBtn = panel.querySelector('.panel-close');
      if (closeBtn) closeBtn.focus();
    }
  });
});

// Close buttons for panels
document.querySelectorAll('.panel-close').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = button.closest('.project-panel');
    if (!panel) return;
    panel.setAttribute('hidden', '');
    const opener = document.querySelector(`[data-opens-dialog="${panel.id}"]`);
    if (opener) {
      opener.setAttribute('aria-expanded', 'false');
      opener.focus();
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  const openPanel = document.querySelector('.project-panel:not([hidden])');
  if (!openPanel) return;

  openPanel.setAttribute('hidden', '');
  const opener = document.querySelector(`[data-opens-dialog="${openPanel.id}"]`);
  if (opener) {
    opener.setAttribute('aria-expanded', 'false');
    opener.focus();
  }
});
