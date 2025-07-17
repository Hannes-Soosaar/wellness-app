import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

console.log("Resend API Key:", process.env.RESEND_API);

const resend = new Resend(process.env.RESEND_API);

const sendVerificationEmail = async (to: string, token: string) => {
  try {
    const verificationLink = `https://localhost:5000/auth/email/verification/?token=${token}`;

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

const sendPasswordResetEmail = async (to: string, token: string) => {
  try {
    const resetLink = `https://localhost:5000/reset-password?token=${token}`;
    const data = await resend.emails.send({
      from: "Wellness app",
      to,
      subject: "Password Reset",
      html: `<p>Click to Reset you password  <a href="${resetLink}"> here </a> to reset your password . </p>`,
    });
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export { sendVerificationEmail, sendPasswordResetEmail };
