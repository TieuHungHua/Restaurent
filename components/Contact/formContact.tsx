'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const ContactForm = () => {
    const [contactInf, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        des: '',
    })
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setContact((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <div className="flex flex-col text-start w-[30%] mx-auto p-6 bg-white shadow-md rounded-xl space-y-6 m-3">
            <h2 className="text-xl font-semibold text-gray-800">
                Vui lòng để lại liên hệ của bạn!
            </h2>

            <form className="space-y-4">
                <div>
                    <Label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                        Họ và tên
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={contactInf.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <Label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                        Email của bạn
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={contactInf.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <Label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                        Số điện thoại
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại của bạn"
                        value={contactInf.phone}
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <Label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700">
                        Nội dung
                    </Label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Nội dung bạn muốn gửi..."
                        value={contactInf.des}
                        onChange={handleChange}
                        className="w-full max-h-[150px]"
                        required
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        Gửi liên hệ
                    </button>
                </div>
            </form>
        </div>

    )
}

export default ContactForm
