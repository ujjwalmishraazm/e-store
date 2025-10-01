import { dbconnect } from "@/lib/dbconnect";
import Usermodel from "@/model/User.model";;
export async function POST(request: Request) {
    try {
        await dbconnect();
        const { username, verifyCode } = await request.json();
            console.log("username,verifycode", username, verifyCode);
        if (!(username || !verifyCode)) {
            return Response.json(
                { success: "false", message: "username and verifycode not found" },
                { status: 404 }
            );
        }
        const user = await Usermodel.findOne({ username });
        if (!user) {
            return Response.json(
                { success: false, message: "user not found" },
                {
                    status: 401,
                }
            );
        }
        const verified = user.verifyCode == verifyCode;
        console.log(verified, "verified");
        const iscodenotExpired = new Date(user.emailVerificationOTPExpiry) > new Date();
        if (verified && iscodenotExpired) {
            user.isEmailVerified = true;
            await user.save();
            return Response.json(
                { success: true, message: "succesfully verified" },
                { status: 201 }
            );
        } else if (!iscodenotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            'Verification code has expired. Please sign up again to get a new code.',
        },
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: 'Incorrect verification code' },
        { status: 400 }
      );
    }
    } catch (error) {
        console.log(error);
        return Response.json(
            { success: false, message: "internal server error" },
            { status: 500 }
        );
    }
}
