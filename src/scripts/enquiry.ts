// Sends a [data-enquiry] form to park-backend-2 as JSON, then swaps it for the
// sibling [data-sent] panel. Without JavaScript the form does nothing, so each
// page also shows the phone number and email address next to it.

const forms = document.querySelectorAll<HTMLFormElement>('form[data-enquiry]');

for (const form of forms) {
  const panel = form.parentElement?.querySelector<HTMLElement>('[data-sent]');
  const error = form.querySelector<HTMLElement>('[data-error]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const body: Record<string, string | boolean> = { kind: form.dataset.enquiry ?? 'contact' };
    for (const [key, value] of new FormData(form)) body[key] = String(value).trim();
    body.consent = form.querySelector<HTMLInputElement>('[name="consent"]')?.checked ?? false;

    error?.setAttribute('hidden', '');
    if (submit) {
      submit.disabled = true;
      submit.dataset.label = submit.textContent ?? '';
      submit.textContent = 'Sending…';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      form.hidden = true;
      if (panel) {
        panel.hidden = false;
        panel.querySelector<HTMLElement>('h2')?.focus();
      }
    } catch {
      error?.removeAttribute('hidden');
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = submit.dataset.label ?? submit.textContent;
      }
    }
  });

  panel?.querySelector('[data-again]')?.addEventListener('click', () => {
    panel.hidden = true;
    form.hidden = false;
    form.querySelector<HTMLElement>('input, textarea')?.focus();
  });
}
