import { MailContent, MailDetails } from "../../@types/email.types";
import { authorize, sendMessage } from "../../config/gmail/gmail";
import fs from "fs";

export const getMailContent = async (type: string): Promise<MailContent | null> => {
	if (type === "VERIFICATION") {
		const { mailBody, mailSubject } = await import("../../templates/email/emailVerification");
		return { mailBody, mailSubject };
	} else if (type === "CHANGE PASSWORD") {
		const { mailBody, mailSubject } = await import("../../templates/email/employeeChangePassword");
		return { mailBody, mailSubject };
	} else {
		return null;
	}
};

export const postEmail = async (mailDetails: MailDetails): Promise<boolean> => {
	fs.readFile("./config/gmail/credGmail.json", (err: any, content: any) => {
		if (err) {
			return false;
		}
		authorize(JSON.parse(content), sendMessage, mailDetails);
	});
	return true;
};
