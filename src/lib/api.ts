const API_URL = 'https://hp-api.onrender.com/api';

function wait(time = 1000): Promise<void> {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, time);
    })
}

// En /lib tenémos funciones específicas aisladas de nuestra aplicación
// funciones puras (si no interviene la UI o el ESTADO)
export async function apiGet<T>(path: string): Promise<T> {
    await wait(100);
    const r = await fetch(`${API_URL}${path}`);
    if (!r.ok) throw new Error(`HTTP${r.status} - ${r.statusText}`);
    return r.json() as Promise<T>;
}