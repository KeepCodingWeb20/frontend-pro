// Un toast debe tener distintos tipos/variants
// La propia clase debe poder generar instancias
// Un toast debe mostrar un mensaje y un TS
// El timestamp debe tener un formato concreto

// const t = Toast.create('error', 'Error llamando api');
// console.log(t.format());

type ToastVariant = 'info' | 'success' | 'error' | 'warning';

export class Toast<TVariant extends ToastVariant> {

    readonly timestamp: Date;

    private constructor(
        readonly variant: TVariant,
        readonly message: string
    ) {
        this.timestamp = new Date();
    }

    // Factory Method
    static create<V extends ToastVariant>(variant: V, message: string): Toast<V> {
        return new Toast(variant, message);
        // Más adelante podemos añadir lógica en el propio create
    }

    format(): string {
        const hh = this.timestamp.getHours().toString().padStart(2, '0');
        const mm = this.timestamp.getMinutes().toString().padStart(2, '0');
        const ss = this.timestamp.getSeconds().toString().padStart(2, '0');
        return `[${this.variant.toUpperCase()}] ${this.message} - (${hh}:${mm}:${ss})`
    }
}

// const t = Toast.create<'error'>('error', 'Error llamando a la api');
// console.log(t.format());
