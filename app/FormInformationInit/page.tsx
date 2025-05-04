'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function CustomerInfoPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        phone: string;
        dob: Date | null;
        gender: string;
        address: string;
        deliveryPhone: string;
        favorites: string;
    }>({
        name: '',
        email: '',
        phone: '',
        dob: null,
        gender: 'khac',
        address: '',
        deliveryPhone: '',
        favorites: '',
    })

    const [avatar, setAvatar] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatar(file)
            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem('access_Token')
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:8000/api/v1/users/guest', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "gender": formData.gender,
                    "birthYear": formData.dob?.getFullYear(),
                    "address": formData.address,
                    "phone": formData.phone,
                }),
            })
            if (!res.ok) {
                alert("Thông tin của bạn bị lỗi!! Mã lỗi: " + res.status);
            }
            router.push('/')
        } catch (e) {
            alert('lỗi thấy em rồi')
            console.log(e)
        }

        // Log to test
        router.push('/')

        // TODO: Gửi dữ liệu + file ảnh lên server
    }


    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card>
                <CardHeader className="justify-center">
                    <h2 className="text-2xl font-semibold text-[#E34234]">Vui lòng điền thông tin cá nhân!</h2>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Ảnh đại diện */}
                        <div className="flex items-center gap-6">
                            {avatarPreview ? (
                                <Avatar className=" w-[80px] h-[80px]">
                                    <AvatarImage src={avatarPreview} />
                                </Avatar>
                            ) : (
                                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-500">
                                    No Avatar
                                </div>
                            )}

                            <div>
                                <Label className="p-2">Ảnh đại diện</Label>
                                <Input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>

                        {/* Thông tin cá nhân */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="p-1.5">Họ và tên</Label>
                                <Input name="name" value={formData.name} onChange={handleChange} required />

                            </div>
                            <div>
                                <Label className="p-1.5">Email</Label>
                                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="p-1.5">Số điện thoại</Label>
                                <Input name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label className="p-1.5">Ngày sinh</Label>
                                <Input type="date" name="dob" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex  flex-row items-center gap-2.5">
                                <Label>Giới tính</Label>
                                <Select defaultValue={formData.gender}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Giới tính" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nam">Nam</SelectItem>
                                        <SelectItem value="nu">Nữ</SelectItem>
                                        <SelectItem value="khac">Khác</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="p-1.5">Số điện thoại nhận hàng</Label>
                                <Input name="deliveryPhone" value={formData.deliveryPhone} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <Label className="p-1.5">Địa chỉ nhận hàng</Label>
                            <Textarea name="address" className="max-h-[80px]" rows={2} value={formData.address} onChange={handleChange} />
                        </div>

                        <div>
                            <Label className="p-1.5">Món yêu thích</Label>
                            <Textarea name="favorites" className="max-h-[80px]" rows={2} value={formData.favorites} onChange={handleChange} />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="button" className="text-gray-500" variant="outline">Bỏ qua</Button>
                            <Button type="submit">Lưu Thông Tin</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
