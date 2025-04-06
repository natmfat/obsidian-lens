// Types for the result object with discriminated union
export type Success<T> = [T, null];
export type Failure<E> = [null, E];
export type Result<T, E = Error> = Success<T> | Failure<E>;

export const err = (message: string): Failure<Error> => [
  null,
  new Error(message),
];

export const ok = <T>(data: T): Success<T> => [data, null];

/**
 * Return errors as values
 * https://www.youtube.com/watch?v=Y6jT-IkV0VM
 * @param promise
 * @returns [data, error]
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}
