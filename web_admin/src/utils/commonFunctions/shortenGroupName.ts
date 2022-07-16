const shortenGroupName = (fileName: string, limit: number) => {
	/* let limit = window.screen.width;
	limit = (limit * 0.33) - 70;
	limit = Math.round(limit / 14); */
	/* var delimeterLastIndex = fileName.lastIndexOf('.'); */
	let dots = "...";

	if (limit >= fileName.length) {
		dots = "";
	}

	const newFileName = fileName.substring(0, limit) + dots;
	return newFileName;
};

export default shortenGroupName;
