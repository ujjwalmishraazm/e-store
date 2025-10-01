import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";


export interface User extends Document {
    role: string;
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isEmailVerified: boolean;
     emailVerificationOTPExpiry: Date;
    phone: string;
    address: string;
    avatar: string;
    deletedAt: Date;

}
const UserSchema: Schema<User> = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        verifyCode: {
            type: String,
            required: true,
        },
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
         emailVerificationOTPExpiry: {
            type: Date,
            default: null,
        },

        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            default: null,
        },
        avatar: {
            url: {
                type: String,
                default: "",
            },
            public_id: {
                type: String,
                default: "",
            },
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) {
        return next();
    }
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (err) {
        next(err as Error);
    }
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// save this user model
const Usermodel = mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default Usermodel;
