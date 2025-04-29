import FavouriteFood from '@/components/FavouriteFood/FavouriteFood';
import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=' '>
            <div className=" px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 scroll-m-0">
                {/* Sidebar nằm bên phải khi màn hình to */}
                <div className="order-3 md:order-1">
                    <FavouriteFood imageUrl="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/493965796_9403705736406089_6033340980356262824_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeE0pP-QXORrRXCRvoC6-mPx1-ztrwn755nX7O2vCfvnmfChwTVKwJptuJaAaBbrakxI1gb6uwLLMxaV9_LG1doK&_nc_ohc=18vlX5Ex9tIQ7kNvwGvJDCF&_nc_oc=Adn1lGYHh2KBncZAWT0o05niGPl_ncY3EvohY5dHvIAfxJb0MZRmK1612hk5fZTGRPs&_nc_zt=23&_nc_ht=scontent.fhan3-4.fna&_nc_gid=wcpnxcbcGbUjbQKLCzfqmQ&oh=00_AfHc4GvAQQJB7-6SIBDZtoXy-0zp9XkOwfLyjCc098iJ6A&oe=68156656"
                        name="Phở Bò"
                        description="Món phở bò truyền thống, thơm ngon đậm đà."
                        quantity={1} />
                </div>

                {/* Nội dung chính */}
                <div className="order-2 md:order-3 md:col-span-2 ">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout
