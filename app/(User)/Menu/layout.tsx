

const Layout = ({ children }: { children: React.ReactNode }) => {

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