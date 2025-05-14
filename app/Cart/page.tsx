'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-menubar'
import React, { useEffect, useState } from 'react'
import { CartItem, CartItemProps } from '../../components/Cart/cartItem';
import PaymentSumary from '../../components/Cart/paymentSumary';
import { useSession } from 'next-auth/react';

export interface PaymentSumaryProps {
    name: string;
    phone: string;
    email: string;
    address: string;
    noted: string;
    typeCheckout: string;

}
const Cart = ({ total, onApplyCoupon, onCheckout }: CartSummaryProps) => {
    const [itemCart, setItemCart] = useState<CartItemProps[]>([])
    const { data: session, status } = useSession()
    const [userInfor, setUserInfor] = useState<PaymentSumaryProps>({
        name: '',
        phone: '',
        email: '',
        address: '',
        noted: '',
        typeCheckout: 'momo',
    });
    const handleCheckout = async () => {
        const cartItem: { dishId: string, number: number }[] = itemCart.map((item) => { return { dishId: item.id, number: Number(item.quantity) } })
        console.log(session?.user.accessToken)
        try {
            const res = await fetch('http://localhost:8000/api/v1/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.accessToken}`
                }, body: JSON.stringify({
                    type: userInfor.typeCheckout,
                    nameUser: userInfor.name,
                    email: userInfor.email,
                    note: userInfor.noted,
                    phone: userInfor.phone,
                    address: userInfor.address,
                    orderAndDish: cartItem,
                })
            })
            if (!res.ok) {
                throw new Error('Fetch post failed: ' + res.status);
            }
        } catch (e) {
            console.log('Lỗi fetch data ở cart/handleCheckout' + e)
        }
    }

    const fetchDataD = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.accessToken}`
                },
            })
            if (!response.ok) {
                throw new Error('Fetch failed: ' + response.status);
            }
            const data = await response.json();
            const newCartItems = data.data.map((i: any) => ({
                id: i.dishId,
                name: i.dish.name,
                imageUrl: i.dish.url,
                price: i.dish.priceNew,
                quantity: i.number,
                onQuantityChange: (newQuantity: number) => {
                    console.log('Quantity changed to:', newQuantity);
                },
                onDelete: () => {
                    console.log('Delete item with id:', i.id);
                }
            }));

            setItemCart(newCartItems);
        } catch (e) {
            alert("Fetch thất bại! " + e)
        }
        console.log(itemCart)
    }

    useEffect(() => {
        if (status === 'authenticated') {
            fetchDataD();
        }
    }, [status])

    const handleDelete = (id: string) => {
        const fetchDataD = async () => {
            console.log("tôi đang fetch!!")
            try {
                const response = await fetch(`http://localhost:8000/api/v1/cart/remove-dish/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.user.accessToken}`
                    },
                })
                if (!response.ok) {
                    throw new Error('Fetch delete failed: ' + response.status);
                }
                const newCartItems = itemCart.filter((i) => (i.id !== id))
                setItemCart(newCartItems);
            } catch {
                alert("Fetch thất bại!")
            }
            console.log(itemCart)
        }
        fetchDataD()

    }
    return (

        <div className='flex flex-row justify-center mt-5 gap-1'>
            <div className='min-h-screen w-[40%]'>
                {itemCart.map((item) => (
                    <CartItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onQuantityChange={(newQuantity) => {
                            setItemCart((prev) =>
                                prev.map((p) =>
                                    p.id === item.id ? { ...p, quantity: newQuantity } : p
                                )
                            );
                        }}
                        onDelete={() => handleDelete(item.id)}
                    />
                ))}

                <CartSummary
                    total={itemCart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                    onApplyCoupon={(code) => console.log("Mã giảm giá:", code)}
                    onCheckout={handleCheckout}
                />
            </div>
            <div>
                <PaymentSumary
                    {...userInfor}
                    setUserInfor={setUserInfor} />
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
            <div className='flex justify-between items-center mb-3'>
                <h3 className="font-normal text-[1rem] text-gray-700">Tổng tiền hàng</h3>
                <span className="font-normal text-[1rem] text-gray-700">{total.toLocaleString()},000 VND</span>
            </div>
            <div className='flex justify-between items-center mb-3'>
                <h3 className="font-normal text-[1rem] text-gray-700">Tổng tiền phí vận chuyển</h3>
                <span className="font-normal text-[1rem] text-gray-700">+đ {10},000 VND</span>
            </div>
            <div className='flex justify-between items-center mb-3'>
                <h3 className="font-normal text-[1rem] text-gray-700">Giảm giá vận chuyển</h3>
                <span className="font-normal text-[1rem] text-red-600">-đ {10},000 VND</span>
            </div>
            <div className='flex justify-between items-center mb-3'>
                <h3 className="font-normal text-[1rem] text-gray-700">Tổng cộng Voucher giảm giá</h3>
                <span className="font-normal text-[1rem] text-red-600">-đ {10},000 VND</span>
            </div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Tổng thanh toán</h3>
                <span className="font-bold text-xl">{(total + 10 - 10 - 10).toLocaleString()},000 VND</span>
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
