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

      <div className="container mx-auto h-dvh w-screen bg-uxcomic-bg">
        <main className="flex flex-col h-full overflow-x-hidden">
          {children || 'No Content'}
        </main>
      </div>
    </>
  )
}

export default Layout
