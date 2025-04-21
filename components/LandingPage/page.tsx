import React from 'react'
import Banner from './banner'
import BenefitSection from './benefit'
import NewFeeds from './new_feeds'
import NewFoods from './New_foods'
import Reserver from '../Reserver/page'

import ListPost from './blog_new'

const LandingPage = () => {
    return (
        <section className='flex flex-col w-full '>
            <Banner />
            <div className='w-full h-15'></div>
            <BenefitSection />
            <div className='w-full h-15'></div>
            <NewFeeds />
            <div className='w-full h-15'></div>
            <NewFoods />
            <Reserver />
            <ListPost />

        </section>
    )
}

export default LandingPage

