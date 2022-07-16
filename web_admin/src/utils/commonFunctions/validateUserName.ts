const validRegex1 = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const validRegex2 = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

const validateUserName = (user_name: string): boolean => {
	if (!(validRegex1.test(user_name) || validRegex2.test(user_name))) return false;

	return true;
};

export default validateUserName;
