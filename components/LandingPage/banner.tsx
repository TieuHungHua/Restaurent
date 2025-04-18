import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Banner = () => {
    return (
        <div className='relative items-center flex flex-col mt-12'>
            <img width={920} src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-may-tinh-de-thuong.jpg' alt='Banner' className='w-[100%] rounded-x1 size-1/2 ' />
            <div className='absolute top-[40%] text-white flex flex-col items-center'>
                <p className='md:text-[6rem] text-[1.75rem] font-light text-center'>Gangster Restaurent</p>
                <Link href={"buy-now"}>
                    <Button variant={'secondary'} className='h-6 mt-2 md:h-10 md:text-[1.5rem] md:mt-4 md:p-4 font-light' >Đặt Món Ngay</Button>
                </Link>
            </div>
        </div>
    )
}

export default Banner
