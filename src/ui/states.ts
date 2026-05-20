
export function renderLoading(label = 'Cargando...'): HTMLElement {
    const wrapper = document.createElement('div');

    // Queremos crear un "spinner" de loading
    wrapper.setAttribute('role', 'status');
    wrapper.setAttribute('aria-live', 'polite');
    wrapper.className = 'flex items-center gap-2 p-4';

    const spinner = document.createElement('span');
    spinner.setAttribute('aria-hidden', 'true');
    spinner.textContent = '...';

    const labelEl = document.createElement('span');
    labelEl.textContent = label;

    wrapper.append(spinner, labelEl);

    return wrapper;
}

// TODO:
// Render error
export function renderError(message: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('role', 'alert');
    wrapper.className = 'flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded';

    wrapper.textContent = `Error: ${message}`;

    return wrapper;
}



// TODO: 
// Render empty