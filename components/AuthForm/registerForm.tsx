'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'


import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
    const router = useRouter()
    const [accepted, setAccepted] = useState(true)
    const [confirmPassword, setConfirm] = useState(true)
    const [userInf, setUserInf] = useState({
        fullname: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Submitting form...')
        try {
            const res = await fetch('http://localhost:8000/api/v1/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userInf.email,
                    password: userInf.password,
                    name: userInf.fullname,
                    role: "Guest",
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed')
            }
            console.log('User created successfully!')

            router.push('/FormInformationInit')

        }
        catch (e) {
            console.error('Register error..: ', e)
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const updatedPassword = {
            ...userInf,
            [name]: value,
        };

        setUserInf(updatedPassword);

        if (name === 'email') return

        if ((name == 'password' && userInf.cpassword === '') || updatedPassword.cpassword === '') {
            setConfirm(true)
            return
        }

        if (updatedPassword.password !== updatedPassword.cpassword) {
            setConfirm(false);
        } else {
            setConfirm(true);
        }
    };

    return (
        <div className="flex flex-col justify-center sm:h-screen p-4">
            <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8 shadow-md">
                <div className="text-center text-[1.75rem] text-slate-800 font-bold mb-12 items-center">
                    Create Account
                </div>

                <form>
                    <div className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <Label htmlFor='fullname' className="text-slate-800 text-sm mb-2 block">
                                Full Name
                            </Label>
                            <Input
                                name="fullname"
                                type='text'
                                id="name"
                                placeholder='Enter full name'
                                className="text-slate-800 bg-white"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="text-slate-800 text-sm mb-2 block">
                                Your Email
                            </Label>
                            <Input
                                name="email"
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                className="text-slate-800 bg-white"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password" className="text-slate-800 text-sm mb-2 block">
                                Password
                            </Label>
                            <Input
                                name="password"
                                type="password"
                                value={userInf.password}
                                id="password"
                                placeholder="Enter password"
                                className="text-slate-800 bg-white"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Label htmlFor="cpassword" className="text-slate-800 text-sm mb-2 block">
                                Confirm Password
                            </Label>
                            <Input
                                name="cpassword"
                                type="password"
                                value={userInf.cpassword}
                                id="cpassword"
                                placeholder="Enter confirm password"
                                className="text-slate-800 bg-white"
                                onChange={handleChange}
                                required
                            />
                            {!confirmPassword ? (
                                <p className='text-red-700 text-[0.75rem]'>(*) Password does not match!</p>
                            ) : (<div></div>)}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" checked={accepted} onCheckedChange={val => setAccepted(!!val)} />
                            <Label htmlFor="terms" className="text-slate-800 text-sm">
                                I accept the{' '}
                                <a href="/" className="text-blue-600 hover:underline font-medium">
                                    Terms and Conditions
                                </a>
                            </Label>

                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-12">
                        <Button type="submit" className={`${accepted ? ('w-full') : ('w-full opacity-65 pointer-events-none')}`} onClick={handleSubmit} >
                            Create and Sign in account
                        </Button>
                    </div>

                    {/* Footer text */}
                    <p className="text-slate-800 text-sm mt-6 text-center">
                        Already have an account?
                        <Link href="/auth/Login" className="text-blue-600 font-medium hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </form>
            </div >
        </div >
    )
}
