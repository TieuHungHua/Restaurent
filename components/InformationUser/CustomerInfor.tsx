"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,

    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

export default function CustomerProfilePage() {
    return (
        <div className="min-h-screen w-full bg-gray-50 pt-4 px-4 md:px-10">
            <Card className="w-[85%] mx-auto p-8 bg-white shadow-sm border rounded-lg">
                <CardHeader className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-semibold">Thông tin khách hàng</CardTitle>
                        <p className="text-sm text-muted-foreground">Mã KH: #CUST10089</p>
                    </div>
                    <Badge className="bg-yellow-500 text-white">Thành viên Vàng</Badge>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {/* Cột 1 - Avatar + Điểm */}
                    <div className="space-y-6 text-center">
                        <Avatar className="w-28 h-28 mx-auto">
                            <AvatarImage src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/492234123_660921343308365_1845109835164570296_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=pmIPoow5RegQ7kNvwFqsMRC&_nc_oc=AdngGMe2mmCnVcxBoPm-lBVGXL1DKE_nWKZ-yq9Y9kDh68CQy-1RrJAOEa8nRGHYBAA&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=HHD6srzm8NM0JHY7uSXgpw&oh=00_AfGLBN_O4r1WHPqPot3_7JVcW4S7A5opmrTKAMDWN7kCnQ&oe=681159B5" />
                            <AvatarFallback>NA</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm text-muted-foreground">Điểm tích lũy</p>
                            <p className="text-2xl font-bold text-green-600">1.200</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Lượt ghé nhà hàng</p>
                            <p className="text-lg font-semibold">8 lần</p>
                        </div>
                    </div>

                    {/* Cột 2 - Thông tin cá nhân */}
                    <div className="space-y-4">
                        <div className="">
                            <Label className="mb-3">Họ và tên</Label>
                            <Input defaultValue="Nguyễn Na" />
                        </div>
                        <div>
                            <Label className="mb-3">Email</Label>
                            <Input defaultValue="nguyenna@gmail.com" />
                        </div>
                        <div>
                            <Label className="mb-3">Số điện thoại</Label>
                            <Input defaultValue="0909 123 456" />
                        </div>
                        <div>
                            <Label className="mb-3">Ngày sinh</Label>
                            <Input type="date" defaultValue="2005-02-14" />
                        </div>
                        <div className="flex flex-row">
                            <Label className="mr-3">Giới tính</Label>
                            <Select defaultValue="khac">
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
                    </div>

                    {/* Cột 3 - Giao hàng + sở thích */}
                    <div className="space-y-4">
                        <div>
                            <Label className="mb-3">Địa chỉ nhận hàng</Label>
                            <Textarea defaultValue="" className="max-h-[100px]" placeholder="Nhập địa chỉ nhận hàng của bạn..." />
                        </div>
                        <div>
                            <Label className="mb-3">Số điện thoại nhận hàng</Label>
                            <Input defaultValue="0911 987 654" />
                        </div>
                        <div>
                            <Label className="mb-3">Món yêu thích</Label>
                            <Textarea className="max-h-[100px]" defaultValue="Bún bò Huế, Cà phê sữa đá" placeholder="Món ăn tôi yêu..." />
                        </div>

                    </div>
                </CardContent>
                <div className="flex justify-end gap-3 pt-4">
                    <Button>Lưu thay đổi</Button>
                    <Button variant="outline">Hủy</Button>
                </div>
            </Card>
        </div>
    );
}
