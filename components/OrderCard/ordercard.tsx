'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface OrderCardProps {
    id: string;
    status: string;
    orderDate: Date;
    payment: number;
    listOrder: {
        dishId: string;
        nameDish: string;
        number: number;
        url: string;
        cost: number
    }[]
}

interface StatusInfo {
    label: string;
    description: string;
    color: string; // Tailwind class hoặc hex code
}
type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'canceled';

const Status: Record<OrderStatus, StatusInfo> = {
    pending: {
        label: "Đang chờ xử lý",
        description: "Chúng tôi đã nhận được đơn hàng của bạn và đang chờ xác nhận.",
        color: "bg-yellow-500"
    },
    confirmed: {
        label: "Đang xử lý",
        description: "Nhà hàng đang chuẩn bị món của bạn.",
        color: "bg-blue-500"
    },
    completed: {
        label: "Đã giao hàng",
        description: "Đơn hàng đã được giao thành công. Chúc bạn ngon miệng!",
        color: "bg-green-400"
    },
    canceled: {
        label: "Đã hủy",
        description: "Đơn hàng đã bị hủy. Nếu có thắc mắc, hãy liên hệ hỗ trợ.",
        color: "bg-red-500"
    }
};


const OrderCard = (item: OrderCardProps) => {
    const { data: session } = useSession()
    const orderDate = format(new Date(item.orderDate), 'yyyy-MM-dd HH:mm');
    const status = item.status;
    const statusColor = "#34D399";  // xanh mint
    const items = item.listOrder
    const total = item.payment;
    const [process, setProcess] = useState<StatusInfo | undefined>()

    useEffect(() => {
        if (item.status) {
            setProcess(Status[item.status as OrderStatus]);
        }
    }, [item.status]);

    const handleReview = () => {
        alert("Chuyển tới trang đánh giá sản phẩm!");
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/order/cancel/${item.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.accessToken}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Hủy đơn hàng thất bại');
            }

            const result = await response.json();
            console.log('Đơn hàng đã được hủy:', result);
            setProcess(Status['canceled'])
        } catch (error) {
            console.error('Lỗi khi hủy đơn hàng:', error);
        }
    }
    return (
        <Card className="p-4 mb-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Đơn hàng - Ngày : {orderDate}</h2>
                <div>
                    {process?.label === 'pending' ? (<Button variant="destructive" onClick={handleDelete} className="text-white mr-2">Hủy</Button>) : (<></>)}
                    <Link href="/order-detail">
                        <Button variant="destructive" className="text-white bg-amber-500">Xem chi tiết</Button>
                    </Link>
                </div>

            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center">
                    <span>Trạng thái:</span>
                    <span className={`${process?.color} text-white px-2 py-1 rounded-md text-sm`} >{process?.label}</span>
                </div>
                <p>{process?.description}</p>
            </div>

            <div className="overflow-x-auto border rounded-md">
                <div className="grid grid-cols-6 bg-gray-100 p-2 font-semibold text-sm">
                    <span>Hình ảnh</span>
                    <span>Tên sản phẩm</span>
                    <span>Giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền</span>
                    <span>Đánh giá</span>
                </div>
                {items.map((item, idx) => {
                    return (
                        <div key={idx} className="grid grid-cols-6 p-2 items-center border-t text-sm">
                            <div className="flex justify-center  bg-gray-100 p-2 font-semibold text-sm">
                                <Image src={item.url} alt={item.nameDish} width={120} height={60} className="rounded object-contain" />
                            </div>
                            <p>{item.nameDish}</p>
                            <p>{item.cost},000 VND</p>
                            <p>{item.number}</p>
                            <p>{item.cost * item.number},000 VND</p>
                            <div className="flex justify-center">
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm">
                                    Đánh giá
                                </Button>
                            </div>
                        </div>
                    )
                })}



            </div>
        </Card>
    );
};

export default OrderCard;



