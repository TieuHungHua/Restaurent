'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-menubar'
import React from 'react'
import { CartItem } from '../../components/Cart/cartItem';
import PaymentSumary from '../../components/Cart/paymentSumary';


interface CartSummaryProps {
    total: number;
    onApplyCoupon: (code: string) => void;
    onCheckout: () => void;

}


const onQuantityChange = (q: number) => { };

const Cart = ({ total, onApplyCoupon, onCheckout }: CartSummaryProps) => {
    return (
        <div className='flex flex-row justify-center mt-5 gap-1'>
            <div className='min-h-screen w-[40%]'>
                <CartItem
                    imageUrl="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"
                    name="Ức gà đút lò phủ lá chanh"
                    price={195000}
                    quantity={3}
                    onQuantityChange={(q) => console.log("Cập nhật:", q)}
                    onDelete={() => console.log("Xoá item")}
                />
                <CartItem
                    imageUrl="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"
                    name="Ức gà đút lò phủ lá chanh"
                    price={195000}
                    quantity={3}
                    onQuantityChange={(q) => console.log("Cập nhật:", q)}
                    onDelete={() => console.log("Xoá item")}
                />
                <CartSummary
                    total={585000}
                    onApplyCoupon={(code) => console.log("Mã giảm giá:", code)}
                    onCheckout={() => console.log("Đi đến thanh toán")}
                />
            </div>
            <div>
                <PaymentSumary />
            </div>

        </div>
    )
}

export default Cart

interface CartSummaryProps {
    total: number;
    onApplyCoupon: (code: string) => void;
    onCheckout: () => void;
}

export const CartSummary = ({ total, onApplyCoupon, onCheckout }: CartSummaryProps) => {
    return (
        <div className="p-4 mt-4 border rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Tổng cộng</h3>
                <span className="font-bold text-xl">{total.toLocaleString()} VND</span>
            </div>

            <Separator className="my-3" />

            <div className="flex gap-2 mb-4">
                <Input placeholder="Nhập mã giảm giá" />
                <Button onClick={() => onApplyCoupon("DEMO")}>Áp dụng</Button>
            </div>

            <Button onClick={onCheckout} className="w-full bg-green-500 hover:bg-green-600">
                Thanh toán
            </Button>
        </div>
    )
}
