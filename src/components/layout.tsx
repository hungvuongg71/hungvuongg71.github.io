import * as React from 'react'
import { CategoryManager, PostManager, TagManager } from './manager'

interface ILayoutProps {}

const Layout: React.FC<React.PropsWithChildren<ILayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <CategoryManager />
      <TagManager />
      <PostManager />

      <div className="container mx-auto">
        <main className="flex flex-col h-screen">
          {children || 'No Content'}
        </main>
      </div>
    </>
  )
}

export default Layout
