import { MailContent, MailDetails } from "../../@types/email.types";
import { authorize, sendMessage } from "../../config/gmail/gmail";
import fs from "fs";
import { AtomicType } from "../../@types/atomicType.types";
import { EMAIL_TYPE } from "../../constants/emailType";

export const verificationEmailSubject = "OTP: For Email Verification";

export const verificationEmailBody = (otp: AtomicType): string => {
	return (
		"Dear User, \n\n" +
		"OTP for your email verification is : \n\n" +
		`${otp}\n\n` +
		"This is a auto-generated email. Please do not reply to this email.\n\n" +
		"Regards\n" +
		"Nexcaliber\n\n"
	);
};

export const changePasswordSubject = "OTP: For Changing your password";

export const changePasswordBody = (otp: AtomicType) => {
	return (
		"Dear User, \n\n" +
		"OTP to change your password : \n\n" +
		`${otp}\n\n` +
		"This is a auto-generated email. Please do not reply to this email.\n\n" +
		"Regards\n" +
		"Nexcaliber\n\n"
	);
};

export const forgetUserIdSubject = "UserId: Retrieve UserId";

export const forgetUserIdBody = (user_id: AtomicType): string => {
	return (
		"Dear User, \n\n" +
		"UserId for your Forget User Id is : \n\n" +
		`${user_id}\n\n` +
		"This is a auto-generated email. Please do not reply to this email.\n\n" +
		"Regards\n" +
		"Nexcaliber\n\n"
	);
};

export const getMailContent = async (type: string): Promise<MailContent | null> => {
	if (type === EMAIL_TYPE.verification) {
		const mailSubject = verificationEmailSubject;
		const mailBody = verificationEmailBody;
		return { mailSubject, mailBody };
	} else if (type === EMAIL_TYPE.change_Password) {
		const mailSubject = changePasswordSubject;
		const mailBody = changePasswordBody;
		return { mailSubject, mailBody };
	} else if (type === EMAIL_TYPE.forget_userid) {
		const mailSubject = forgetUserIdSubject;
		const mailBody = forgetUserIdBody;
		return { mailSubject, mailBody };
	}
	else {
		return null;
	}
};

export const postEmail = async (mailDetails: MailDetails): Promise<boolean> => {
	fs.readFile("./src/config/gmail/credGmail.json", (err: any, content: any) => {
		if (err) {
			return false;
		}
		authorize(JSON.parse(content), sendMessage, mailDetails);
	});
	return true;
};
