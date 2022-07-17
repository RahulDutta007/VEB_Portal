export const formateMongoDateService = (date: string): string => {
	const splitDate = date.split("-");
	const year = splitDate[0];
	let month = splitDate[1];
	let day = splitDate[2];

	if (Number(month) < 10 && !month.startsWith("0")) month = "0" + month;

	if (Number(day) < 10 && !day.startsWith("0")) day = "0" + day;

	const revisedDate = year + "-" + month + "-" + day;
	return revisedDate;
};

export const addMinutesToDate = (date: number, minutes: number): number => date + minutes * 60000;

export const compareDate = (date1: Date, date2: Date): boolean => {
	if (date1 > date2) {
		return true;
	} else if (date1 === date2) {
		return false;
	} else {
		return false;
	}
};
