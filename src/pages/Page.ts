export abstract class Page {

    abstract readonly slug: string;
    abstract readonly title: string;

    constructor(
        protected readonly root: HTMLElement
    ) {}

    abstract render(): void | Promise<void>;

    async mount(): Promise<void> {
        document.title = this.title;
        console.log(`[Page] mounting ${this.slug}`);
        await this.render();
    }

    unmount(): void {
        this.root.replaceChildren();
    }
}