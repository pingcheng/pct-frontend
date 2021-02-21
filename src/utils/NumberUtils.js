/**
 * Check if a value is an integer.
 * Return the integer value if it is, otherwise return null.
 *
 * @param value
 * @returns {null|number}
 */
export function integerOrNull(value) {
    const valueCopy = parseInt(value);

    if (Number.isInteger(valueCopy)) {
        return valueCopy;
    }

    return null;
}