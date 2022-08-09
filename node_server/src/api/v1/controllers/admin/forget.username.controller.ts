import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import service from "../../../../services";
import EmployeeRegisterModel from "../../../../models/Admin/employee.register.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmailService } from "../../../../services/common/sendEmail.services";
import { ForgotUserIdEmail } from "../../../../constants/email.enum";
import AdminModel from "../../../../models/Admin/admin.register.model";

export const ForgetUserName = async (req: Request, res: Response) => {
  try {
    const filter = { email: req.body.email };
    const UserInstance = await service.query.fetchOne(AdminModel, filter);

    if (!UserInstance?._doc)
      return res.json({ status: 404, text: `No Member Found With given information: ${req.body.credential}` });

    sendEmailService(ForgotUserIdEmail.replace("${userId}", UserInstance._doc.user_name), "Retrieve UserId", UserInstance._doc.email);


    // console.log("Message sent: %s", info.messageId);
    return res.status(200).json({
      status: 200,
      text: `Member Found With Mail: ${UserInstance._doc.email} and massage had been sent`
    });
  } catch (err: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message
    });
  }
};

