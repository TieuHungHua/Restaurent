// use this in a client component
import { signIn } from "next-auth/react";

export async function authenticate(email: string, password: string) {
    try {
        const res = await signIn("credentials", {
            email, // not "username"
            password,
            callbackUrl: "/", // tránh tự chuyển trang
        });
        return res;
    } catch (error) {
        console.error("auth login error: ", error);
    }
}