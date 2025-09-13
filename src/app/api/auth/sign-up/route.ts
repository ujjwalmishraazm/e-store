import { sendVerificationEmail } from "@/helper/verificationEmail";
import { dbconnect } from "@/lib/dbconnect";
import registerSchema from "@/lib/signup";
import Usermodel from "@/model/User.model";

export async function POST(request: Request) {
    try {
        await dbconnect();
          const payload = await request.json();
        const validateSchema = registerSchema.pick({
            username: true,
            email: true,
            password: true,
        });
      
        const validateData = validateSchema.safeParse(payload);
        if (!validateData.success) {
            return Response.json(
                { success: false, message: "unable to get data" },
                {
                    status: 404,
                }
            );
        }
        const { username, email, password } = validateData.data;
        const usernameexist = await Usermodel.findOne({ username });
        if (usernameexist) {
            return Response.json(
                {
                    success: false,
                    message: "user already exist with this email",
                },
                { status: 400 }
            );
        }

        const existingUserwithEmail = await Usermodel.findOne({ email });
        const verifyCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        //veifycodeexpiry 100mins from now
        const verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 10000);

        if (existingUserwithEmail) {
            return Response.json(
                {
                    success: false,
                    message: "user already exist with this email",
                },
                { status: 400 }
            );
        }
        // create new user

        const user = new Usermodel({
            username,
            email,
            password,
            emailVerificationOTP: verifyCode,
            emailVerificationOTPExpiry: verifyCodeExpiry,
            isEmailVerified: false,
        });
        await user.save();
        // send verify email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );
        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }
        return Response.json(
            {
                success: true,
                message: "user created successfully",
                userId: user._id,
                email: user.email,
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            { success: false, message: "internal server error", error },
            { status: 500 }
        );
    }
}
