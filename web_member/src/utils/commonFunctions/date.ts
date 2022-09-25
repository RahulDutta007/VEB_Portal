const dateConverterUSA = (value: string): string => {
	const parsedDate = Date.parse(value);
	const date = new Date(parsedDate);
	const convertedDate = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
	return convertedDate;
};

export const getCurrentDate = (): string =>
	new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDay();

export const getFirstOfNextMonth = (): string => {
	const date = new Date();
	const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
	console.log("newdate", newDate);
	const formattedDate = newDate.getFullYear() + "-" + newDate.getMonth() + "-" + newDate.getDay();
	return formattedDate;
};

export default dateConverterUSA;
