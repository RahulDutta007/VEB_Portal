import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import service from "../../../../services";
import EmployeeRegisterModel from "../../../../models/Admin/employee.register.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AdminModel from "../../../../models/Admin/admin.register.model";
import { getMailContent, postEmail } from "../../../../services/email/email.service";
import { EMAIL_TYPE } from "../../../../constants/emailType";

export const ForgetUserId = async (req: Request, res: Response) => {
  try {
    const { role, email } = req.body;
    console.log("Role", role);
    console.log("Email", email);
    const filter = {
      $and: [
        { email },
        { role }
      ]
    };
    const UserInstance = await service.query.fetchOne(AdminModel, filter);

    if (!UserInstance?._doc) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: MESSAGE.custom("No Member Found With given information")
      });
    }

    const mailContent = await getMailContent(EMAIL_TYPE.forget_userid);

    if (mailContent === null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGE.custom("Incorrect Type Provided"),
        result: false
      });
    }

    const { mailBody, mailSubject } = mailContent;
    const mailDetails = {
      mailOptions: {
        to: UserInstance._doc.email,
        from: `${process.env.Sender_email}`,
        subject: mailSubject,
        body: mailBody(UserInstance._doc.user_name)
      },
      res: res
    };

    await postEmail(mailDetails);

    return res.status(StatusCodes.OK).json({
      message: MESSAGE.post.succ,
      result: `UserId sent to mail: ${UserInstance._doc.email}`
    });
  } catch (err: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: MESSAGE.post.fail,
      err
    });
  }
};

