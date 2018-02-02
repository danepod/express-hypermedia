export class Link {
    href: string;

    rel: string;

    name?: string;

    render?: string;

    prompt?: string;

    constructor(href: string, rel: string) {
        this.href = href;
        this.rel = rel;
    }
}