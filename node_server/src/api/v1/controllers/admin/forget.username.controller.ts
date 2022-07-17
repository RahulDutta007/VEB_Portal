import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import service from "../../../../services";
import EmployeeRegisterModel from "../../../../models/Admin/employee.register.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmailService } from "../../../../services/common/sendEmail.services";

export const GetToken = async (req: Request, res: Response) => {
  try {
    const filter = req.body.credential.includes("@")
      ? { email: req.body.credential }
      : { member_id: req.body.credential };
    const UserInstance = await service.query.fetchOne(EmployeeRegisterModel, filter);

    if (!UserInstance._doc)
      return res.json({ status: 404, text: `No Member Found With given information: ${req.body.credential}` });

    const payload = { _id: UserInstance._doc.member_id, expireDate: new Date().getTime() + 15 * 60 * 1000 };
    const token = jwt.sign(payload, "Z5C39DA2BA906BE3786B28DD700D0D9C2093D6934676J87R0A67378AB9F70BEC32");
    sendEmailService(token, UserInstance._doc.email);


    // console.log("Message sent: %s", info.messageId);
    return res.status(200).json({
      status: 200,
      text: `Member Found With Mail: ${UserInstance._doc.email} and massage had been sent with token`,
      token
    });
  } catch (err: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message
    });
  }
};

