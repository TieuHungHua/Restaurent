// types/next-auth.d.ts
import NextAuth from "next-auth"

export interface IUser {
    id: string
    name?: string
    email?: string
    avatar?: string
    role?: string
    accessToken?: string
    refreshToken?: string
    emailVerified?: Date | null;
}

declare module "next-auth" {
    interface Session {
        user: IUser // Sử dụng IUser thay vì AdapterUser
    }

    interface User extends IUser { }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: IUser
    }
}
