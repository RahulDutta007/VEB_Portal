import { Response } from "express";
import { AtomicType, LinkType, TokenType } from "./atomicType.types";

export type MailContent = {
	mailBody: (OTP: AtomicType) => string;
	mailSubject: string;
};

export type MailDetails = {
	mailOptions: {
		to: any;
		from: any;
		subject: any;
		body: any;
	};
	res: Response<any, Record<string, any>>;
};

export type MailHTMLContent = {
	mailBody: (link: LinkType, token: TokenType) => string;
	mailSubject: string;
};
