/**
 * This represents the Data object structure as defined in the Collection+JSON spec.
 * 
 * It resembles a key-value pair as well as a human-readable and localizable prompt. This is used in several occasions, e.g. to serialize key-value pairs for Items, or to inform a client of available fields for sending data in Templates.
 */
export class Data {
    /**
     * The name of a property
     */
    name: string;

    /**
     * The value of a property
     */
    value?: ( number | string | null | boolean );

    /**
     * The human-readable prompt which may be displayed to the end user by a client
     */
    prompt?: string;

    /**
     * This represents the Data object structure as defined in the Collection+JSON spec.
     * @param name The name of a property
     * @param value The value of a property
     * @param prompt The human-readable prompt which may be displayed to the end user by a client
     */
    constructor(name: string, value?: ( number | string | null | boolean ), prompt?: string) {
        this.name = name;
        this.value = value;
        this.prompt = prompt;
    }
}