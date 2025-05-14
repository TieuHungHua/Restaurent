'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PaymentSumaryProps } from "@/app/Cart/page"

interface PaymentProps extends PaymentSumaryProps {
    setUserInfor: (updatedInfo: PaymentSumaryProps) => void;
}

export default function PaymentSumary({ name, phone, email, address, noted, typeCheckout, setUserInfor }: PaymentProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUserInfor({
            name,
            phone,
            email,
            address,
            noted,
            typeCheckout,
            [name]: value,
        });
    }
    return (
        <Card className="max-w-xl w-full h-auto shadow-md">
            <CardHeader>
                <CardTitle>Thông tin người nhận</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <Label>Tên người nhận:</Label>
                    <Input defaultValue={name} name="name" onChange={handleChange} placeholder="Nhập tên của bạn..." />
                </div>

                <div className="space-y-3">
                    <Label>Số điện thoại:</Label>
                    <Input defaultValue={phone} name="phone" onChange={handleChange} placeholder="(84) xxx xxx xxxx" />
                </div>

                <div className="space-y-3">
                    <Label>Email:</Label>
                    <Input type="email" defaultValue={email} name="email" onChange={handleChange} placeholder="user@example.com" />
                </div>

                <div className="space-y-3">
                    <Label>Địa chỉ:</Label>
                    <Textarea defaultValue={address} name="address" onChange={handleChange} className="max-h-[100px]" placeholder="Nhập địa chỉ nhận hàng của bạn..." />
                </div>

                <div className="space-y-3">
                    <Label>Ghi chú:</Label>
                    <Textarea defaultValue={noted} name="noted" onChange={handleChange} placeholder="Nhập ghi chú cho đơn hàng (VD: Không hành)" className="max-h-[200px]" />
                </div>

                <div>
                    <Label className="mb-2 block">Chọn phương thức thanh toán:</Label>
                    <RadioGroup defaultValue={typeCheckout} name="typeCheckout"
                        onValueChange={(value) =>
                            setUserInfor({
                                ...{ name, phone, email, address, noted, typeCheckout },
                                typeCheckout: value,
                            })
                        } className=" gap-4 grid-cols-3">
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-xl p-1.5">
                            <RadioGroupItem value='momo' id="momo" />
                            <Label htmlFor="momo">
                                <img src="https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-1/352757343_1879233049125660_4727560855644771929_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=waI0CWFq-38Q7kNvwEGpoEc&_nc_oc=Adkmv9OXeebJiPgqQJZopH3hWN3rVbY75WRvrb64ar1wjoq0bqPzKbSv1cTZPgkUWac&_nc_zt=24&_nc_ht=scontent.fhan3-1.fna&_nc_gid=MNFdVl1OZAefzyVpyyEyqg&oh=00_AfG2wZteIN440qDrF1u0a5tpzU7d3N5gJrmQsptw9iMI0g&oe=6808FA37" alt="Momo" className="w-8 h-8 object-contain" />
                                Momo
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-xl p-2">
                            <RadioGroupItem value="atm" id="atm" />
                            <Label htmlFor="atm">
                                <img src="https://media.istockphoto.com/id/1302890997/vi/vec-to/c%E1%BA%A7m-tay-th%E1%BA%BB-ghi-n%E1%BB%A3-ho%E1%BA%B7c-th%E1%BA%BB-t%C3%ADn-d%E1%BB%A5ng-%C4%91%E1%BB%83-thanh-to%C3%A1n.jpg?s=612x612&w=0&k=20&c=mp3e5VvxhbLD5jId3Yk2KberyojaAz4jf_8iDcOUYLs=" alt="ATM" className="w-11 h-11 object-contain" />
                                ATM
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-xl p-1">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash">
                                <img src="https://tncl.vn/wp-content/uploads/2020/02/ship_14.jpg" alt="COD" className="w-8 h-8 object-contain" />
                                Thanh toán khi nhận hàng
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    )
}
