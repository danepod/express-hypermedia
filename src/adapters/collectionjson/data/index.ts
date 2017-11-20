export class Data {
    name: string;

    value?: ( number | string | null | boolean );

    prompt?: string;

    constructor(name: string, value?: ( number | string | null | boolean ), prompt?: string) {
        this.name = name;
        this.value = value;
        this.prompt = prompt;
    }
}