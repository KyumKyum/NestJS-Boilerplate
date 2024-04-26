export type Ok<T> = { type: 'OK'; data: T };
export type Err<E extends Error> = { type: 'ERROR'; error: E };

export type Result<T, E extends Error> = Ok<T> | Err<E>;
