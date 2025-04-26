import Post_Detail from '@/components/Post/Post'
import React from 'react'


const DesciptPost = []



const Blog = () => {
    return (
        <div>
            <div className='min-h-[80vh] max-h-42 overflow-y-scroll'>
                <Post_Detail />
                <Post_Detail />
                <Post_Detail />
            </div>
        </div>
    )
}

export default Blog
