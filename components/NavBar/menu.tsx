import { FormNavType } from '@/lib/interface'
import Link from 'next/link'
import React from 'react'
import InfUser from './inf-user'


interface MenuProps {
    links: FormNavType[]
}
const DesktopMenu: React.FC<MenuProps> = ({ links }) => {
    return (
        <>
            {<Link href={'/'} className='object-fit justify-center col-start-1 size-22 border-2 p-1.5 ' >
                <img draggable="false" src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/490804621_1242004277926306_5976090442755426602_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=5awQ9rbj_wsQ7kNvwH-1nf2&_nc_oc=AdlEnM7Q_F-t1X8rnq2vyJO67j8VtY9CwxI50Y0-X_IHoW9hNgaagAoMTphyMSz12yA&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=imoEk3kVCqJTIlH8qTY9dw&oh=00_AfEqs92717PdxR0-zHOTg4iuvYPKksWn1S8hsjF45pdhFA&oe=6802CE5B' />
            </Link>}
            <ul className='col-start-2 flex gap-3 justify-items-center items-center  md:text-[1.25rem]'>
                {links.map((link: FormNavType) => {
                    return (
                        <Link key={link.id} href={link.url} scroll={true} className='text-[1rem] p-1.5 w-full items-center justify-items-center text-gray-700 text-4xl hover:text-gray-900 font-medium'>
                            {link.title}
                        </Link>
                    )
                })}

            </ul>
            <InfUser />
        </>
    )
}

export default DesktopMenu
