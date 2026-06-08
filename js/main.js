document.getElementById('year').textContent = new Date().getFullYear();

// --- Project detail dialogs ---
document.querySelectorAll('[data-opens-dialog]').forEach((button) => {
	button.addEventListener('click', () => {
		const dialog = document.getElementById(button.dataset.opensDialog);
		if (dialog) dialog.showModal();
	});
});

document.querySelectorAll('.dialog-close').forEach((button) => {
	button.addEventListener('click', () => {
		button.closest('dialog').close();
	});
});

// Click on the backdrop (outside the dialog box) closes the dialog.
document.querySelectorAll('dialog').forEach((dialog) => {
	dialog.addEventListener('click', (event) => {
		const rect = dialog.getBoundingClientRect();
		const insideBox =
			event.clientY >= rect.top &&
			event.clientY <= rect.bottom &&
			event.clientX >= rect.left &&
			event.clientX <= rect.right;
		if (!insideBox) dialog.close();
	});
});
