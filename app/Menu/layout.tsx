'use client'
import FilterGroup from "@/components/FilterGroup/filter";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [category, setCategory] = useState('Tất cả');
    const [brand, setBrand] = useState('Tất cả');
    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'sticky' }}>

            {/* Sidebar Filter */}


            {/* Main content */}
            <main style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
                {children}
            </main>

        </div>
    );
};

export default Layout;