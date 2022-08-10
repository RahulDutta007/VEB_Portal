import { MailContent, MailDetails } from "../../@types/email.types";
import { authorize, sendMessage } from "../../config/gmail/gmail";
import fs from "fs";

import { AtomicType } from "../../@types/atomicType.types";

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



export const getMailContent = async (type: string): Promise<MailContent | null> => {
	console.log("mail type", type);
	if (type === "VERIFICATION") {
		console.log("mail");
		// const { mailBody, mailSubject } = await import("../../templates/email/emailVerification");
		const mailSubject = verificationEmailSubject;
		const mailBody = verificationEmailBody;

		return { mailSubject, mailBody };
	} else if (type === "CHANGE PASSWORD") {
		const { mailBody, mailSubject } = await import("../../templates/email/employeeChangePassword");
		return { mailBody, mailSubject };
	} else {
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
