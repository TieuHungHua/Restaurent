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
                <img draggable="false" src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/493228985_122166285362433358_4514734088814946791_n.jpg?stp=dst-jpg_p552x414_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=f-w7s4-DIsYQ7kNvwFyho6o&_nc_oc=AdlyKmAGwJvBFXI_xiwKLOTVd4Zz3KsO1VZtDKBpLKzWp3vvKb7QV_X-wPWPpukEx7s&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=jFgj3PFhArVOqkvP96mMBA&oh=00_AfF_iYXmW9XJ8oUvQe2UjtCbDeEHJ5JGwMurrZYU7LbLTg&oe=681537D9' />
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
