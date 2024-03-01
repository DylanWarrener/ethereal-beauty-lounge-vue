/**
 * Checks that the supplied value is not empty.
 * @param {string} value The value to check.
 * @returns {boolean|string} True, if the value is not empty, otherwise returns the key to the error text.
 */
export function notEmpty(value: string): boolean | string {
	let retVal: boolean | string = false;
	// Checks for null & undefined
	if (value) {
		// Gets rid of whitespaces
		let val = value.trim();

		// Checks the length
		retVal = val.length > 0 || "A value must be entered.";
	} else {
		retVal = "A value must be entered.";
	}
	return retVal;
}
