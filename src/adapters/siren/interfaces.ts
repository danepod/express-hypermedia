// Interfaces and Type Aliases specific to Siren ------------------------------
export interface Field {
    name: string,
    type?: Type,
    title?: string,
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