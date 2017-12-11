export class Error {
    title?: string;

    code?: string;

    message?: string;

    constructor(title?: string, code?: string, message?: string) {
        this.title = title;
        this.code = code;
        this.message = message;
    }
}