'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { useInformation } from '@/hooks/useInformation'
import { InfoContextType } from '@/hooks/InformationContext'


export default function AuthForm() {
    const router = useRouter()
    const { info, setInfo } = useInformation()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:8000/api/v1/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message || 'Login failed')
            }
            const tokenData = data.data?.token
            console.log("Login sucessfull", data)
            localStorage.setItem('access_Token', tokenData.access_token);
            localStorage.setItem('refresh_Token', tokenData.refresh_token);
            setInfo((prev: InfoContextType) => ({
                ...prev,
                name: data.data.user.name,
                email: data.data.user.email,
                isBan: data.data.user.isBan,
                role: data.data.user.role,
                avatar: data.data.user.avatar,
            }))
            console.log("Login sucessfull")
            router.push('/')
        } catch (e) {
            console.log("Login error", e)
        }
        // Điều hướng sau khi đăng nhập thành công
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md border border-slate-300 rounded-2xl p-8 shadow-md bg-white">
                <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">
                    Sign in to your account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="email" className='m-2'>Email address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className='m-2'>Password</Label>
                            <Link
                                href="#"
                                className="text-sm text-indigo-600 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Not a member?{' '}
                    <Link
                        href="/auth/Register"
                        className="font-medium text-indigo-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
