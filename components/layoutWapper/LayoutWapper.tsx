'use client'

import { usePathname } from 'next/navigation'
import NavBar from '@/components/NavBar/page'
import Footer from '@/components/Footer/page'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAuthPage = pathname.startsWith('/auth')

    return (
        <>
            {!isAuthPage && <NavBar />}
            {children}
            {!isAuthPage && <Footer />}
        </>
    )
}
