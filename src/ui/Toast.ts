type ToastVariant = 'info' | 'success' | 'error' | 'warning';

export class Toast<TVariant extends ToastVariant> {
  readonly timestamp: Date;

  private constructor(
    readonly variant: TVariant,
    readonly message: string,
  ) {
    this.timestamp = new Date();
  }

  static create<V extends ToastVariant>(variant: V, message: string): Toast<V> {
    return new Toast(variant, message);
  }

  static fromError(error: Error): Toast<'error'> {
    return Toast.create('error', error.message);
  }

  format(): string {
    const hh = this.timestamp.getHours().toString().padStart(2, '0');
    const mm = this.timestamp.getMinutes().toString().padStart(2, '0');
    const ss = this.timestamp.getSeconds().toString().padStart(2, '0');
    return `[${this.variant.toUpperCase()}] ${this.message} (${hh}:${mm}:${ss})`;
  }

  toJSON(): { variant: TVariant; message: string; timestamp: string } {
    return {
      variant: this.variant,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Monta el Toast como elemento del DOM con a11y correcta.
   * Retorna cleanup para eliminar el elemento y el timeout.
   */
  mountToDOM(container: HTMLElement, durationMs = 4000): () => void {
    const ac = new AbortController();

    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.className = this.toastClassName();
    el.textContent = this.message;

    // Botón de cierre con aria-label para accesibilidad (icono sin texto)
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'ml-auto text-lg font-bold leading-none opacity-70 hover:opacity-100';
    closeBtn.setAttribute('aria-label', 'Cerrar notificación');
    closeBtn.textContent = '×';

    const removeToast = (): void => {
      el.remove();
      ac.abort();
    };

    closeBtn.addEventListener('click', removeToast, { signal: ac.signal });
    el.append(closeBtn);
    container.append(el);

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (durationMs > 0) {
      timeoutId = setTimeout(removeToast, durationMs);
    }

    return () => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      ac.abort();
      el.remove();
    };
  }

  private toastClassName(): string {
    const base = 'flex items-center gap-2 p-3 rounded text-sm font-medium';
    const variants: Record<ToastVariant, string> = {
      info:    `${base} bg-blue-50 text-blue-800`,
      success: `${base} bg-green-50 text-green-800`,
      error:   `${base} bg-red-50 text-red-800`,
      warning: `${base} bg-yellow-50 text-yellow-800`,
    };
    return variants[this.variant];
  }
}
