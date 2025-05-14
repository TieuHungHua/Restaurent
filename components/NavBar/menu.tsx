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
                <img draggable="false" src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/493228985_122166285362433358_4514734088814946791_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=n86lRnQdqlAQ7kNvwGgTAGS&_nc_oc=Adn3gyoZQGrqp93hCDoNyei6f3krA6o-JPbgdFCon-jnGBnZEBZDxW-7vl6pPo1E97M&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=jIycBjqbhzypw8c82bZrvQ&oh=00_AfKJvKNaxZWReXBUb-6IbJbZXNtLNs2nrWGFzF40uYzP0g&oe=68288DD9' />
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
