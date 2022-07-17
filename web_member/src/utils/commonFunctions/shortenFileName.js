const shortenFileName = (fileName, limit = 15) => {
	var delimeterLastIndex = fileName.lastIndexOf(".");
	var dots = "...";

	if (limit >= fileName.length) {
		limit = delimeterLastIndex;
		dots = "";
	}

	var newFileName = fileName.substr(0, limit) + dots + fileName.substr(delimeterLastIndex);
	return newFileName;
};

export default shortenFileName;
