import Link from 'next/link';
import React from 'react'
import { FaSearch, FaShoppingCart, FaBox, FaUser } from "react-icons/fa";
const InfUser = () => {
    return (
        <div className="flex flex-col items-center text-gray-700 text-sm space-y-1">
            <div className="flex space-x-6">
                <MenuItem icon={<FaSearch />} label="Tìm kiếm" />
                <Link href={'/Cart'} className='w-auto'><MenuItem icon={<FaShoppingCart />} label="Giỏ hàng" /></Link>
                <Link href={'/Order'} className='w-auto'><MenuItem icon={<FaBox />} label="Đơn hàng" /></Link>
                <Link href={'/Information'} className='w-auto '><MenuItem icon={<FaUser />} label="Nguyễn Na" /></Link>


            </div>
            <div className="text-xs text-gray-500 space-x-2 mt-1">
                <Link href={'/Favourite'} className='hover:underline'>Danh sách yêu thích</Link>
                <span>|</span>
                <Link href={'/Reserve'} className='hover:underline'>Đặt bàn</Link>
                <span>|</span>
                <span>Chính sách</span>
            </div>

        </div>
    );
}

export default InfUser

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center space-x-1 cursor-pointer hover:text-black">
            {icon}
            <span>{label}</span>
        </div>
    );
}
