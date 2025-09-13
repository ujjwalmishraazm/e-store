import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      role: "admin" | "user";
      username: string;
      email: string;
      isEmailVerified: boolean;
      phone: string;
      address?: string | null;
      isemailverificationotpexpired?: Date | null;
      avatar?: {
        url: string;
        public_id: string;
      };
      deletedAt?: Date | null;
      verifycode?: string;
    };
  }

  interface User {
    _id: string;
    role: "admin" | "user";
    username: string;
    email: string;
    password: string; // only used on backend
    verifycode?: string;
    isEmailVerified: boolean;
    isemailverificationotpexpired: Date | null;
    phone: string;
    address?: string | null;
    avatar?: {
      url: string;
      public_id: string;
    };
    deletedAt?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    role: "admin" | "user";
    username: string;
    email: string;
    isEmailVerified: boolean;
    isemailverificationotpexpired?: Date | null;
    phone: string;
    address?: string | null;
    avatar?: {
      url: string;
      public_id: string;
    };
    deletedAt?: Date | null;
    verifycode?: string;
  }
}
