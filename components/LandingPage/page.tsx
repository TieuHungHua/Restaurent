import React from 'react'
import Banner from './banner'
import BenefitSection from './benefit'
import NewFeeds from './new_feeds'
import NewFoods from './New_foods'
import Reserver from '../ReserverForm/ReserveForm'

import ListPost from './blog_new'
import ReserverForm from '../ReserverForm/ReserveForm'

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
            <div className='w-full h-28'></div>
            <ReserverForm />
            <div className='w-full h-15'></div>
            <ListPost />

        </section>
    )
}

export default LandingPage

