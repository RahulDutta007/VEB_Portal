import nodemailer from "nodemailer";

export const sendEmailService = async (text: string, subject: string, email: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "arnab1744.cs@gmail.com",
        pass: "ciliythhlrbwaecn"
      }
    });
    await transporter.sendMail({
      // eslint-disable-next-line quotes
      from: '"Nexcaliber " <arnab1744.cs@gmail.com>',
      to: email, // list of receivers // use comma for multiple accounts
      subject: subject, // Subject line
      html: text
    });
  } catch (err) {
    throw err;
  }
};
