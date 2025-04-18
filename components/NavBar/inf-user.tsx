import React from 'react'
import { FaSearch, FaShoppingCart, FaBox, FaUser } from "react-icons/fa";
const InfUser = () => {
    return (
        <div className="flex flex-col items-center text-gray-700 text-sm space-y-1">
            <div className="flex space-x-6">
                <MenuItem icon={<FaSearch />} label="Tìm kiếm" />
                <MenuItem icon={<FaShoppingCart />} label="Giỏ hàng" />
                <MenuItem icon={<FaBox />} label="Đơn hàng" />
                <MenuItem icon={<FaUser />} label="Tài khoản" />
            </div>
            <div className="text-xs text-gray-500 space-x-2 mt-1">
                <span>Danh sách yêu thích</span>
                <span>|</span>
                <span>Đặt bàn</span>
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
