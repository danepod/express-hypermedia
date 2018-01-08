// Interfaces and Type Aliases specific to Siren ------------------------------
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

export interface FieldValueObject {
    title?: string,
    value: (string | number),
    selected?: boolean
}

export type Type = "hidden" | "text" | "search" | "tel" | "url" | "email" |
"password" | "datetime" | "date" | "month" | "week" | "time" |
"datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" |
"file";