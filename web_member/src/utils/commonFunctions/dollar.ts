export const numberToDollarStr = (value: number): string => {
	let strValue = "$" + String(value);
	if (!strValue.includes(".")) {
		strValue = strValue + ".00";
	}
	return strValue;
};
