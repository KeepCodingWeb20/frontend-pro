/**
 * Estados visuales tipados. Cada función devuelve un HTMLElement listo para append.
 * Consolidan la discriminated union de S2 (idle/loading/success/error) con UX profesional.
 *
 * El modelo de estado NO cambia. La discriminated union de S2 sigue intacta.
 * Solo cambia el renderizado. ESTO es separar dominio de presentación.
 */

/**
 * Renderiza el estado de carga con accesibilidad.
 * `role="status"` + `aria-live="polite"` para que el lector de pantalla anuncie el cambio.
 */
export function renderLoading(label = 'Cargando...'): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('role', 'status');
  wrapper.setAttribute('aria-live', 'polite');
  wrapper.className = 'flex items-center gap-2 p-4 text-muted';

  const spinner = document.createElement('span');
  spinner.className = 'loading-spinner';
  spinner.setAttribute('aria-hidden', 'true');
  spinner.textContent = '';

  const labelEl = document.createElement('span');
  labelEl.textContent = label;

  wrapper.append(spinner, labelEl);
  return wrapper;
}

/**
 * Renderiza el estado de error.
 * `role="alert"` para anuncio inmediato por lector de pantalla.
 */
export function renderError(message: string): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('role', 'alert');
  wrapper.className = 'flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded';
  wrapper.textContent = `Error: ${message}`;
  return wrapper;
}

export interface EmptyOptions {
  label: string;
  hint?: string;
}

/**
 * Renderiza el estado vacío con mensaje y sugerencia opcional.
 */
export function renderEmpty({ label, hint }: EmptyOptions): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex flex-col items-center gap-2 p-8 text-muted';

  const icon = document.createElement('span');
  icon.className = 'text-4xl';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '🔍';

  const labelEl = document.createElement('p');
  labelEl.className = 'font-medium';
  labelEl.textContent = label;

  wrapper.append(icon, labelEl);

  if (hint) {
    const hintEl = document.createElement('p');
    hintEl.className = 'text-sm';
    hintEl.textContent = hint;
    wrapper.append(hintEl);
  }

  return wrapper;
}
