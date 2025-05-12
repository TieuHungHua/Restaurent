'use server'
export async function handleLogin({
    email,
    password,
}: {
    email: string;
    password: string;
}) {

    try {
        const res = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        if (!res.ok) {
            throw new Error(res.status.toString() || 'Login failed')
        }
        //console.log("Login sucessfull", data)
        return res.json()

    } catch (e) {
        console.log("Login error", e)
        return null
    }
    // Điều hướng sau khi đăng nhập thành công
}