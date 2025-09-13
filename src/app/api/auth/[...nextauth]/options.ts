import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbconnect } from "@/lib/dbconnect";
import Usermodel from "@/model/User.model";

type Credentials = {
    email: string;
    password: string;
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(
                credentials: Credentials | undefined
            ): Promise<null> {
                if (!credentials) {
                    throw new Error("No credentials provided");
                }
                await dbconnect();
                try {
                    const user = await Usermodel.findOne({
                        email: credentials?.email,
                    });
                    if (!user) {
                        throw new Error("No user found with this email");
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (err) {
                    throw err instanceof Error ? err : new Error(String(err));
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id.toString(); // ObjectId → string
                token.role = user.role;
                token.username = user.username;

                token.avatar = user.avatar || { url: "", public_id: "" };
                token.deletedAt = user.deletedAt || null;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user && token) {
                session.user._id = token._id;
                session.user.role = token.role;
                session.user.username = token.username;
                session.user.avatar = token.avatar;
                session.user.deletedAt = token.deletedAt;
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in",
    },
};
