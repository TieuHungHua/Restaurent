import ContactForm from '@/components/Contact/formContact'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-row text-center gap-1.5 mt-2.5'>

            <Image alt='ảnh nền' src={"https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/495463438_122168235812433358_1347451758632473351_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=U5U1AhK_ADsQ7kNvwHapG5k&_nc_oc=AdmeJcCPISr_hQTdmVJgVCK1z2B0nARIprOBeTSPcbcwxggbfE9ktmxG0QMrAXjSqYE&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=6mJv2NU0Se3TZZAEur5J4g&oh=00_AfKCxnh6wVW-6_etJneWNoht1dgz3hgATte3wg95mkQn8A&oe=68228677"}
                className='w-[70%]'
                width={800}
                height={100}
            />

            <ContactForm />
        </div>
    )
}

export default page
