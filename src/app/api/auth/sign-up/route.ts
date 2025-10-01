import { sendVerificationEmail } from "@/helper/verificationEmail";
import { dbconnect } from "@/lib/dbconnect";
import registerSchema from "@/lib/signup";
import Usermodel from "@/model/User.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await dbconnect();
        const payload = await request.json();
        const validateSchema = registerSchema.pick({
            username: true,
            email: true,
            password: true,
        });

        const validateData = registerSchema.safeParse(payload);
        if (!validateData.success) {
            return NextResponse.json(
                { success: false, message: "unable to get data" },
                {
                    status: 404,
                }
            );
        }
        const { username, email, password } = validateData.data;
        console.log("username,email,password", username, email, password);
        // check if user already exist
        const usernameexist = await Usermodel.findOne({ username });
        if (usernameexist) {
            return NextResponse.json(
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
        //veifycodeexpiry 10mins from now
        const verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
        console.log("verifycode", verifyCode);
        if (existingUserwithEmail) {
            return NextResponse.json(
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
            verifyCode,
            emailVerificationOTPExpiry: verifyCodeExpiry,
            isEmailVerified: false,
            phone: "098764321",
            isemailverificationotpexpired: new Date(Date.now() + 10 * 60 * 1000),
        });
        console.log("new user", user.verifyCode);
        await user.save();
        // send verify email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );
        console.log("email response", emailResponse);
        if (!emailResponse.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }
        return NextResponse.json(
            {
                success: true,
                message: "user created successfully",
                userId: user._id,
                email: user.email,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in sign-up:", error);
        return NextResponse.json(
            { success: false, message: "internal server error", error },
            { status: 500 }
        );
    }
}
