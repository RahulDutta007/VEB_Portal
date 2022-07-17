import { url, port } from "../../config/config";
/* eslint-disable */
const downloadFile = (file) => {
	let a = document.createElement("a");
	a.href = URL.createObjectURL(file);
	a.download = file.name;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};

export default downloadFile;
