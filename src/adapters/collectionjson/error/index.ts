/**
 * An object containing information on errors that may have occured while processing a request.
 */
export class Error {
    /**
     * Title of the error
     */
    title?: string;

    /**
     * Error code
     */
    code?: string;

    /**
     * Further information regading the error, e.g. a stack trace. May be undefined in production environments
     */
    message?: string;

    /**
     * An object containing information on errors that may have occured while processing a request.
     * @param title Title of the error
     * @param code Error code
     * @param message Further information regading the error, e.g. a stack trace. May be undefined in production environments
     */
    constructor(title?: string, code?: string, message?: string) {
        this.title = title;
        this.code = code;
        this.message = message;
    }
}