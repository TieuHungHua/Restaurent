import { FormNavType } from '@/lib/interface'
import React from 'react'
import DesktopMenu from './menu'

const NavBar = () => {
    const nav: FormNavType[] = [
        {
            id: 'link1',
            title: 'Trang chủ',
            url: '/'
        },
        {
            id: 'link2',
            title: 'Giới thiệu',
            url: '/Introduce'
        },
        {
            id: 'link3',
            title: 'Thực đơn',
            url: '/Menu'
        },
        {
            id: 'link4',
            title: 'Bài viết',
            url: '/Blog'
        },
        {
            id: 'link5',
            title: 'Liên hệ',
            url: '/Contract'
        }

    ]
    return (
        <div className='sticky top-0 z-50 shadow-sm  select-none'>
            {/* {desktop menu} */}
            <nav className='hidden md:grid grid-cols-3 gap-4 items-center border-b-1 border-black bg-[#e8e8e8] '>
                <DesktopMenu links={nav} />
            </nav>
        </div>
    )
}

export default NavBar
