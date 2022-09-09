const calculateAge = (birthDate: string, otherDate: string | Date): number => {
	const _birthDate = new Date(birthDate);
	const _otherDate = new Date(otherDate);

	let years = _otherDate.getFullYear() - _birthDate.getFullYear();

	if (
		_otherDate.getMonth() < _birthDate.getMonth() ||
		(_otherDate.getMonth() == _birthDate.getMonth() && _otherDate.getDate() < _birthDate.getDate())
	) {
		years--;
	}

	return years;
};

export default calculateAge;
