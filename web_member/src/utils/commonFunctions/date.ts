const dateConverterUSA = (value: string): string => {
	const parsedDate = Date.parse(value);
	const date = new Date(parsedDate);
	const convertedDate = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
	return convertedDate;
};

export default dateConverterUSA;
