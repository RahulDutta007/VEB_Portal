const dateConverterUS = (_date: string): string => {
	const parsedDate: number = Date.parse(_date);
	const date: Date = new Date(parsedDate);
	const strDate: string = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
	return strDate;
};

export default dateConverterUS;
