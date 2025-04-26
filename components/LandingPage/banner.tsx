import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Banner = () => {
    return (
        <div className='relative items-center flex flex-col mt-4'>
            <img width={920} src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/492144393_122164790096433358_5871678154703331075_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Zph_8DX8ADAQ7kNvwEAoyGj&_nc_oc=AdlOGz4Z1RtVMmgiKEV1igj2qy13Gl_yFtnGYAI23DgMgF65iFleKc1Vmw3KXCVAreA&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=TLyD8cD6jbDDWklS8y20ww&oh=00_AfHVQTsnS0-7Htdd03eA_2FG6Z_9wt94_E0OVXvQ0rr_ew&oe=6809B52B' alt='Banner' className='w-[100%] rounded-x1 size-1/2 ' />
            <div className='absolute top-[52%] text-white flex flex-col items-center'>
                <Link href={"buy-now"}>
                    <Button variant={'secondary'} className='h-6 mt-2 md:h-10 md:text-[1.5rem] md:mt-4 md:p-4 font-bold' >Đặt Món Ngay</Button>
                </Link>
            </div>
        </div>
    )
}

export default Banner
