

import Credentials from "next-auth/providers/credentials"
import { handleLogin } from "./api/auth/[...nextauth]/api"
import NextAuth from "next-auth";
import { IUser } from "@/types/next-auth";


// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const user: any = await handleLogin({
                    email: credentials?.email as string,
                    password: credentials?.password as string,
                });

                if (!user) {
                    throw new Error("Invalid credentials.")
                }
                return {
                    id: user.data.user.id,
                    email: user.data.user.email,
                    name: user.data.user.name,
                    role: user.data.user.role,
                    avatar: user.data.user.avatar,
                    accessToken: user.data.token.access_token,
                    refreshToken: user.data.token.refresh_token,
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/Login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Add the user properties to the token
                token.user = (user as IUser)
            }
            return token
        },
        async session({ session, token }) {

            if (token?.user) {
                // Gán giá trị cho session.user và ép kiểu về IUser
                (session.user as IUser) = token.user as IUser;
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            // Chuyển hướng người dùng sau khi đăng nhập thành công
            // Nếu bạn muốn chuyển hướng về trang chủ, trả về baseUrl
            return '/'; // Hoặc bạn có thể trả về URL khác như '/dashboard'
        },
    },

})