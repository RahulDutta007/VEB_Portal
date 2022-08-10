import { Response } from "express";
import fs from "fs";
import readline from "readline";
import { google } from "googleapis";

const gmail = google.gmail("v1");

const SCOPES = [
	"https://mail.google.com/",
	"https://www.googleapis.com/auth/gmail.modify",
	"https://www.googleapis.com/auth/gmail.compose",
	"https://www.googleapis.com/auth/gmail.send"
];

const TOKEN_PATH = "./src/config/gmail/token.json";

export function authorize(
	credentials: { web: { client_secret: any; client_id: any; redirect_uris: any } },
	callback: {
		(
			auth: any,
			details: {
				mailOptions: { to: any; from: any; subject: any; body: any };
				res: {
					status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any } };
					send: () => void;
				};
			}
		): void;
		(arg0: any, arg1: any): void;
	},
	details: {
		mailOptions: { to: any; from: string; subject: any; body: any };
		res: Response<any, Record<string, any>>;
	}
) {
	const { client_secret, client_id, redirect_uris } = credentials.web;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	fs.readFile(TOKEN_PATH, (err: any, token: any) => {
		if (err) return getNewToken(oAuth2Client, callback, details);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client, details);
	});
}

function getNewToken(
	oAuth2Client: {
		generateAuthUrl: (arg0: { access_type: string; prompt: string; scope: string[] }) => any;
		getToken: (arg0: any, arg1: (err: any, token: any) => void) => void;
		setCredentials: (arg0: any) => void;
	},
	callback: (arg0: any, arg1: any) => void,
	details: any
) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		prompt: "consent",
		scope: SCOPES
	});
	console.log("Authorize this app by visiting this url:", authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question("Enter the code from that page here: ", (code: any) => {
		rl.close();
		oAuth2Client.getToken(code, (err: any, token: any) => {
			if (err) return console.error("Error retrieving access token", err);
			oAuth2Client.setCredentials(token);

			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
				if (err) return console.error(err);
				console.log("Token stored to", TOKEN_PATH);
			});
			callback(oAuth2Client, details);
		});
	});
}

function makeBody(to: any, from: any, subject: any, message: any) {
	const str = [
		"Content-Type: text/html; charset=\"UTF-8\"\n",
		"MIME-Version: 1.0\n",
		"Content-Transfer-Encoding: 7bit\n",
		"to: ",
		to,
		"\n",
		"from: ",
		from,
		"\n",
		"subject: ",
		subject,
		"\n\n",
		message
	].join("");

	const encodedMail = new Buffer(str).toString("base64").replace(/\+/g, "-").replace(/\//g, "_");
	return encodedMail;
}

export function sendMessage(
	auth: any,
	details: {
		mailOptions: { to: any; from: any; subject: any; body: any };
		res: {
			status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any } };
			send: () => void;
		};
	}
) {
	const raw = makeBody(
		details.mailOptions.to,
		details.mailOptions.from,
		details.mailOptions.subject,
		details.mailOptions.body
	);
	gmail.users.messages.send(
		{
			auth: auth,
			userId: "me",
			resource: {
				raw: raw
			}
		},
		function (err: any, response: any) {
			if (err) {
				console.log(err);
				details.res.status(400).send(err);
			} else details.res.send();
		}
	);
}