// Interfaces and Type Aliases specific to Siren ------------------------------
/**
 * Fields represent controls inside of actions.
 */
export interface Field {
    /**
     * A name describing the control. Field names MUST be unique within the set of fields for an action. The behaviour of clients when parsing a Siren document that violates this constraint is undefined. Required.
     */
    name: string,

    /**
     * Describes aspects of the field based on the current representation. Possible values are implementation-dependent and should be documented. MUST be an array of strings. Optional.
     */
    class?: string[],

    /**
     * The input type of the field. This may include any of the input types specified in HTML5. When missing, the default value is text. Serialization of these fields will depend on the value of the action's type attribute. See type under Actions in the Siren specification. Optional.
     */
    type?: Type,

    /**
     * Textual annotation of a field. Clients may use this as a label. Optional.
     */
    title?: string,

    /**
     * A value assigned to the field. Optional.
     */
    value?: (string | number) | FieldValueObject
}

/**
 * Value objects represent multiple selectable field values. Use in conjunction with field `"type" = "radio"` and `"type" = "checkbox"` to express that zero, one or many out of several possible values may be sent back to the server.
 */
export interface FieldValueObject {
    /**
     * Textual description of a field value.
     */
    title?: string,

    /**
     * Possible value for the field.
     */
    value: (string | number),

    /**
     * A value object with a `"selected" = true` attribute indicates that this value should be considered preselected by the client. When missing, the default value is `false`.
     */
    selected?: boolean
}

/**
 * The input type of the field. This is a subset of the input types specified by HTML5.
 */
export type Type = "hidden" | "text" | "search" | "tel" | "url" | "email" |
"password" | "datetime" | "date" | "month" | "week" | "time" |
"datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" |
"file";