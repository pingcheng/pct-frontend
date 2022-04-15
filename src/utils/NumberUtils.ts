/**
 * Check if a value is an integer.
 * Return the integer value if it is, otherwise return null.
 *
 * @param value
 * @returns {null|number}
 */
export function integerOrNull(value: string | number | null): number | null {
  const valueCopy = String(value);
  const regex = /^-?\d+$/;

  if (regex.test(valueCopy)) {
    return parseInt(valueCopy);
  }

  return null;
}
