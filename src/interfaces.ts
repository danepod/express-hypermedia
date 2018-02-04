// Interfaces and Type Aliases ------------------------------------------------
/**
 * Define HTTP methods relevant to users of the library. Every method is defined in [RFC7231, Sec. 4.1](https://tools.ietf.org/html/rfc7231#section-4.3), except for PATCH which is defined in [RFC5789](https://tools.ietf.org/html/rfc5789).
 * 
 * Use this whenever you need to restrict a value to be one of these.
 */
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';