document.getElementById('year').textContent = new Date().getFullYear();

// --- Project detail panels (expand/collapse) ---
const announcer = document.getElementById('project-announcer');

document.querySelectorAll('[data-opens-dialog]').forEach((button) => {
  const dialogId = button.dataset.opensDialog;
  const dialog = document.getElementById(dialogId);
  const isDialogElement = dialog?.tagName === 'DIALOG';

  button.addEventListener('click', () => {
    if (!dialog) return;
    const projectName = dialog.querySelector('h3')?.textContent || 'Project details';

    if (isDialogElement) {
      // Close any other open dialogs
      document.querySelectorAll('dialog[open]').forEach((d) => {
        if (d !== dialog) d.close();
      });
      
      dialog.showModal();
      if (announcer) announcer.textContent = `${projectName} opened. Use Escape or the Close button to exit.`;
      const closeBtn = dialog.querySelector('.dialog-close');
      if (closeBtn) closeBtn.focus();
    } else {
      // Legacy div-based panels
      const isOpen = !dialog.hasAttribute('hidden');

      document.querySelectorAll('.project-panel').forEach((p) => {
        if (p !== dialog) {
          p.setAttribute('hidden', '');
          const b = document.querySelector(`[data-opens-dialog="${p.id}"]`);
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        dialog.setAttribute('hidden', '');
        button.setAttribute('aria-expanded', 'false');
        if (announcer) announcer.textContent = `${projectName} closed.`;
        button.focus();
      } else {
        dialog.removeAttribute('hidden');
        button.setAttribute('aria-expanded', 'true');
        if (announcer) announcer.textContent = `${projectName} opened. Use Escape or the Close button to exit.`;
        const closeBtn = dialog.querySelector('.panel-close');
        if (closeBtn) closeBtn.focus();
      }
    }
  });
});

// Close buttons for dialog elements
document.querySelectorAll('.dialog-close').forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = button.closest('dialog');
    if (dialog) {
      dialog.close();
      const opener = document.querySelector(`[data-opens-dialog="${dialog.id}"]`);
      if (opener) opener.focus();
    }
  });
});

// Close buttons for legacy panel elements
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
  if (openPanel) {
    openPanel.setAttribute('hidden', '');
    const opener = document.querySelector(`[data-opens-dialog="${openPanel.id}"]`);
    if (opener) {
      opener.setAttribute('aria-expanded', 'false');
      opener.focus();
    }
  }
});
