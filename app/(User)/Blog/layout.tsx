import FilterPost from '@/components/Post/FilterPost';
import React from 'react'

const BlogLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=" px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 scroll-m-0">
            {/* Sidebar nằm bên phải khi màn hình to */}
            <div className="order-2 md:order-3">
                <FilterPost />
            </div>

            {/* Nội dung chính */}
            <div className="order-3 md:order-1 md:col-span-2 ">
                {children}
            </div>
        </div>
    );
};

export default BlogLayout;