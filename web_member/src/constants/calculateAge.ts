export const calculateAge = function (birthDay: Date) {
	// birthday is a date
	const ageDifMs = Date.now() - birthDay.getTime();
	const ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const calculateAgeGroup = function (age: number) {
	if (age >= 18 && age <= 49) {
		return "18-49";
	} else if (age >= 50 && age <= 59) {
		return "50-59";
	} else {
		return "60-64";
	}
};
