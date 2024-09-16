import * as React from 'react'

interface ILayoutProps {
    pageTitle: string
}

const Layout: React.FC<React.PropsWithChildren<ILayoutProps>> = ({ pageTitle, children }) => {
    return (
        <div className="container mx-auto">
            <main>
                <h1 className="text-5xl font-bold">{pageTitle}</h1>
                {children || 'No Content'}
            </main>
        </div>
    )
}

export default Layout