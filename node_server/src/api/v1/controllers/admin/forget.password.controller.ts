import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import service from "../../../../services";
import EmployeeRegisterModel from "../../../../models/Admin/employee.register.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export const GetToken = async (req: Request, res: Response) => {

  const filter = req.body.credential.includes('@') ? { email: req.body.credential } : { member_id: req.body.credential };
  const UserInstance = await service.query.fetchOne(EmployeeRegisterModel, filter);

  if (!UserInstance._doc) return res.json({ status: 404, text: `No Member Found With given information: ${req.body.credential}` });

  let payload = { _id: UserInstance._doc.member_id, expireDate: new Date().getTime() + 15 * 60 * 1000 };
  let token = jwt.sign(payload, 'Z5C39DA2BA906BE3786B28DD700D0D9C2093D6934676J87R0A67378AB9F70BEC32');

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arnab1744.cs@gmail.com",
      pass: "ciliythhlrbwaecn"
    },
  });
  let link;
  if (process.env.NODE_ENV == "development") link = "http://142.93.222.151/api/v1"
  if (process.env.NODE_ENV == "production") link = "http://142.93.222.151/api/v1"
  let info = await transporter.sendMail({
    from: '"Nexcaliber " <arnab1744.cs@gmail.com>',
    to: UserInstance._doc.email, // list of receivers // use comma for multiple accounts
    subject: "Reset Password", // Subject line
    html: `<a href="${link}/forget-password/verify-token/${token}" target="_blank" > Click Here Re-new Password within 15 minute </a> <p>${link}/forget-password/verify-token/${token}</p>`, // html body
  });

  // console.log("Message sent: %s", info.messageId);
  return res.status(200).json({ status: 200, text: `Member Found With Mail: ${UserInstance._doc.email} and massage had been sent with token`, token });
}

// @desc User Forget Password (verify token and reset password)
// @route POST /api/v1/forget-password/verify-token/:token
// @access Public
// exports.verifyToken = async (req: Request, res: Response) => {
//   let token = await jwt.verify(req.params.token, process.env.password_Secret);
//   let timeCheck = new Date(token.expireDate) > new Date();
//   if (timeCheck) {
//     let user = await userModel.findById(token._id);
//     if (!user) return res.json({ status: 404, text: `No Member Found ` });
//     const check_new_password = await bcrypt.compare(req.body.password, user.password);
//     if (check_new_password) {
//       return res.status(500).json({
//         message: "New password cannot be same as old password"
//       })
//     }
//     const salt = await bcrypt.genSalt(10)
//     let password = await bcrypt.hash(req.body.password, salt)
//     user = await userModel.findByIdAndUpdate(token._id, { password: password });
//     return res.json({ status: 200, token, isAccess: timeCheck, text: "Password Updated" });
//   }


// }





// //log creation + dynamic notification + dynamic email left
// export const ForgetPassword = async (req: Request, res: Response) => {
//   let user = await userModel.findOne(req.body.credential.includes('@') ? { email: req.body.credential } : { user_name: req.body.credential });
//   if (!user) return res.json({ status: 404, text: `No Member Found With Mail: ${req.body.credential}` });

//   let payload = { _id: user._id, expireDate: new Date().getTime() + 15 * 60 * 1000 };
//   let token = jwt.sign(payload, process.env.password_Secret);

//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "arnab1744.cs@gmail.com",
//       pass: "ciliythhlrbwaecn"
//     },
//   });
//   let link;
//   if (process.env.NODE_ENV == "development") link = "http://142.93.222.151/api/v1"
//   if (process.env.NODE_ENV == "production") link = "http://142.93.222.151/api/v1"
//   let info = await transporter.sendMail({
//     from: '"Nexcaliber " <arnab1744.cs@gmail.com>',
//     to: user.email, // list of receivers // use comma for multiple accounts
//     subject: "Reset Password", // Subject line
//     html: `<a href="${link}/forget-password/verify-token/${token}" target="_blank" > Click Here Re-new Password within 15 minute </a> <p>${link}/forget-password/verify-token/${token}</p>`, // html body
//   });

//   // console.log("Message sent: %s", info.messageId);
//   return res.status(200).json({ status: 200, text: `Member Found With Mail: ${user.email} and massage had been sent with token`, token });
// };
