import { AtomicType } from "../../@types/atomicType.types";

export const mailSubject = "OTP: For Email Verification";

export const mailBody = (otp: AtomicType) => {
	return (
		"Dear User, \n\n" +
		"OTP for your email verification is : \n\n" +
		`${otp}\n\n` +
		"This is a auto-generated email. Please do not reply to this email.\n\n" +
		"Regards\n" +
		"Nexcaliber\n\n"
	);
};
