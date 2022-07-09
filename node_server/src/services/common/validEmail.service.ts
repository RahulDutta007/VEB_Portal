const validEmailRegex1 = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
const validEmailRegex2 =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Check Valid Email entered or not
export const isValidEmailService = (email: string): boolean => {
	try {
		if (!(validEmailRegex1.test(email) && validEmailRegex2.test(email))) return false;

		return true;
	} catch (err) {
		throw err;
	}
};
