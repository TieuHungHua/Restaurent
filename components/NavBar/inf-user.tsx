import Link from 'next/link';
import React from 'react'
import { FaSearch, FaShoppingCart, FaBox, } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaUser, FaUsers, FaIdBadge, FaCreditCard } from 'react-icons/fa'
import { MdLogout } from "react-icons/md";
import { useInformation } from '@/hooks/useInformation';
import { useRouter } from 'next/navigation';



const InfUser = () => {
    const router = useRouter()
    const { info, setInfo } = useInformation()
    const handleLogout = async () => {
        const token = localStorage.getItem('access_Token')
        try {
            await fetch('http://localhost:8000/api/v1/auth/logout', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

        } catch (e) {
            console.log('Loi khong the dang xuat!', e)
        }
        localStorage.clear()
        setInfo({
            name: "Tài khoản",
            email: "",
            isBan: false,
            avatar: null,
            role: "",
            guest: {
                gender: '',
                birthYear: null,
                address: "",
                phone: "",
                favouritefood: null,
                points: null,
                role: ""
            },
            shopingCart: []
        })
        router.push('/auth/Login')
    }
    // console.log('đây là ở navbar', info)
    return (
        <div className="flex flex-col items-center text-gray-700 text-sm space-y-1 text-nowrap">
            <div className="flex space-x-6">
                <MenuItem icon={<FaSearch />} label="Tìm kiếm" />
                <Link href={'/Cart'} className='w-auto'><MenuItem icon={<FaShoppingCart />} label="Giỏ hàng" /></Link>
                <Link href={'/Order'} className='w-auto'><MenuItem icon={<FaBox />} label="Đơn hàng" /></Link>
                {/* <Link href={'/Information'} className='w-auto '><MenuItem icon={<FaUser />} label="Nguyễn Na" /></Link> */}

                <DropdownMenu >
                    <DropdownMenuTrigger>
                        <MenuItem icon={<FaUser />} label={info.name} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-[150px]'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Link href={'/Information'} className='flex items-center gap-2 \'>
                                <FaIdBadge /> Profile
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className='flex items-center gap-2'>
                            <FaUsers /> Team
                        </DropdownMenuItem>

                        <DropdownMenuItem className='flex items-center gap-2' onClick={handleLogout}>
                            <MdLogout /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

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
