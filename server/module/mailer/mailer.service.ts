import nodemailer from "nodemailer";
import process from "process";
import Mail from "nodemailer/lib/mailer";

// TODO переделать MailerService
export class MailerService {
  public async send(
    email: string,
    mailOptions: Omit<Mail.Options, "from" | "to">,
  ) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        ...mailOptions,
        // subject: "invite next-project",
        // text: "test text",
      });
    } catch (e) {
      // @ts-ignore
      console.log("error >>>> ", { ...e });
    }
  }
}
