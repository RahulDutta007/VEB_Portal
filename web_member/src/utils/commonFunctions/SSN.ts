export const hideSSN = (SSN: number): string => {
	let hiddenSSN = "***-**-";
	const strSSN = String(SSN);

	for (let idx = 5; idx < strSSN.length; idx++) {
		hiddenSSN = hiddenSSN + strSSN[idx];
	}

	return hiddenSSN;
};
