import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API);

const sendVerificationEmail = async (to: string, token: string) => {
  try {
    const verificationLink = `http://localhost:5000/test/user?token=${token}`;

    const data = await resend.emails.send({
      from: "Wellness app <register@geaglampings.eu>",
      to,
      subject: "Verify your Email",
      html: `<p>Click  <a href="${verificationLink}"> here </a> to verify your email . </p>`,
    });
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export { sendVerificationEmail };
