import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Banner = () => {
    return (
        <div className='relative items-center flex flex-col mt-4'>
            <img width={920} src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/492144393_122164790096433358_5871678154703331075_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tWMgfKo3V2gQ7kNvwEwcNTE&_nc_oc=Adl-Lea5wb-7iRZhRWN9BNOIW5ECfDSmJODcmJiGQ3JHTf51G-RMZ6SJ_6_7ZicHrN8&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=4URo5HkI4oxtPxxXxlFw_Q&oh=00_AfFdBDyMFyk7PBp8DDkuFx3jrF7dCzxcGNdrpek4ftgfxw&oe=68155A6B' alt='Banner' className='w-[100%] rounded-x1 size-1/2 ' />
            <div className='absolute top-[52%] text-white flex flex-col items-center'>
                <Link href={"buy-now"}>
                    <Button variant={'secondary'} className='h-6 mt-2 md:h-10 md:text-[1.5rem] md:mt-4 md:p-4 font-bold' >Đặt Món Ngay</Button>
                </Link>
            </div>
        </div>
    )
}

export default Banner
