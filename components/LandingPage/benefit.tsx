import React from 'react'
import { FaTruck, FaUtensils, FaShieldAlt, FaMoneyBillWave } from "react-icons/fa";

const BenefitSection = () => {
    const benefits = [
        {
            icon: <FaTruck size={28} />,
            title: "Miễn phí vận chuyển",
            desc: "Cho đơn hàng từ 500k",
        },
        {
            icon: <FaUtensils size={28} />,
            title: "Bảo hiểm món ăn",
            desc: "Đảm chất lượng đồ ăn",
        },
        {
            icon: <FaMoneyBillWave size={28} />,
            title: "Thanh toán COD",
            desc: "Hoặc thanh toán quét mã QR",
        },
        {
            icon: <FaShieldAlt size={28} />,
            title: "Bảo mật thông tin",
            desc: "Đảm bảo thông tin khách hàng",
        },
    ];
    return (
        <div className="flex justify-between items-center bg-white py-6 px-4 md:px-10 text-gray-800 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] select-none">
            {benefits.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 max-w-[200px]">
                    <div className="text-black">{item.icon}</div>
                    <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BenefitSection
