
import nodemailer from "nodemailer";
import { verificationTemplate } from "../../email/verificationEmail";


export async function sendVerificationEmail(    
	email: string,
	username: string,
	verifyCode: string
): Promise< { success: boolean; message: string }> {
	try {
		const transport = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT),
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		const mailOptions = {
			from: process.env.USER_MAIL,
			to: email,
			subject: "Verify Your Email",
			html: verificationTemplate({ username, otp: verifyCode }),
		};

		const mailResponse = await transport.sendMail(mailOptions);
        console.log("Mail response:", mailResponse);
		return {
			success: true,
			message: "Verification email sent successfully",
		};
	} catch (error) {
		console.log("Error sending verification email", error);
		return {
			success: false,
			message: "Error sending verification email",
		};
	}
}