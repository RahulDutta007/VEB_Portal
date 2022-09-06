const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const validatePassword = (password: string): boolean => {
	if (!validPasswordRegex.test(password)) return false;

	return true;
};

export default validatePassword;
