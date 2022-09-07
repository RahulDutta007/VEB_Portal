import { Request, Response } from "express";
import MESSAGE from "../../../../constants/message";
import { decode, encode } from "../../../../services/crypto/crypto.service";
import { addMinutesToDate, compareDate } from "../../../../services/date/date.service";
import { fetchOne, insert } from "../../../../services/query/query.service";
import { getMailContent, postEmail } from "../../../../services/email/email.service";
import OTPModel from "../../../../models/otp/otp.model";

export const sendOTPToEmail = async (req: Request, res: Response) => {
	try {
		const { email, type } = req.body;

		const OTP = Math.floor(Math.random() * 90000) + 10000;
		const now = Date.now();
		const expirationTime = addMinutesToDate(now, 10);

		const payload = {
			otp: OTP,
			expiration_time: expirationTime
		};
		const OTPInstance = await insert(OTPModel, payload);

		const details = {
			timestamp: now,
			check: email,
			success: true,
			message: "OTP sent to user",
			otp_id: OTPInstance._id
		};

		const encoded = await encode(JSON.stringify(details));

		const mailContent = await getMailContent(type);

		if (mailContent === null) {
			return res.status(400).json({
				message: MESSAGE.custom("Incorrect Type Provided"),
				result: false
			});
		}

		const { mailBody, mailSubject } = mailContent;
		const mailDetails = {
			mailOptions: {
				to: email,
				from: `${process.env.Sender_email}`,
				subject: mailSubject,
				body: mailBody(OTP)
			},
			res: res
		};
		console.log("OPT", OTP)
		await postEmail(mailDetails);


		return res.status(200).json({
			message: MESSAGE.post.succ,
			result: encoded
		});
	} catch (err: any) {
		const response = {
			message: "Error",
			result: err.message
		};
		return res.status(400).send(response);
	}
};

export const verifyOTP = async (req: Request, res: Response) => {
	try {
		const currentDate = new Date();
		const { verification_key, otp, check } = req.body;
		let decoded;

		try {
			decoded = await decode(verification_key);
		} catch (err) {
			const response = { message: MESSAGE.custom("Bad Request") };
			return res.status(400).send(response);
		}

		const decodedObject = JSON.parse(decoded);
		const decodedObjectCheck = decodedObject.check;

		if (decodedObjectCheck !== check) {
			const response = {
				message: MESSAGE.custom("OTP was not sent to this particular email or phone number")
			};
			return res.status(400).send(response);
		}

		const filter = {
			_id: decodedObject.otp_id
		};
		const OTPInstance = await fetchOne(OTPModel, filter);

		if (OTPInstance !== null) {
			// Check if OTP is already used or not
			if (OTPInstance.verified !== true) {
				// Check if OTP is expired or not
				if (compareDate(OTPInstance.expiration_time, currentDate)) {
					// Check if OTP is equal to the OTP in the DB
					if (otp === OTPInstance.otp) {
						// Mark OTP as verified or used
						OTPInstance.verified = true;
						await OTPInstance.save();

						const response = {
							message: MESSAGE.custom("OTP matched"),
							result: { check }
						};
						return res.status(200).json(response);
					}

					const response = { message: MESSAGE.custom("OTP did not match") };
					return res.status(400).json(response);
				}

				const response = { message: MESSAGE.custom("OTP expired") };
				return res.status(400).json(response);
			}

			const response = { message: MESSAGE.custom("OTP already used") };
			return res.status(400).send(response);
		}

		const response = { message: MESSAGE.custom("Bad request") };
		return res.status(400).json(response);
	} catch (err: any) {
		const response = {
			message: "Error",
			result: err.message
		};
		return res.status(400).send(response);
	}
};
