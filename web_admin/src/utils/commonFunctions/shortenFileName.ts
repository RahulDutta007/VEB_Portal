const shortenFileName = (fileName: string, limit = 15): string => {
	const delimeterLastIndex = fileName.lastIndexOf(".");
	let dots = "...";

	if (limit >= fileName.length) {
		limit = delimeterLastIndex;
		dots = "";
	}

	const newFileName = fileName.substring(0, limit) + dots + fileName.substring(delimeterLastIndex);
	return newFileName;
};

export default shortenFileName;
