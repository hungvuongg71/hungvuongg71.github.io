import React, { useState, JSX } from 'react'
import { Post, UxComicService } from '../services/uxcomic-service'
import { UxComicCard, UxComicDialog } from './common'
import { renderContent } from '../helpers/content-helper'

interface IPostsSectionProps {
  posts: Post[]
  loading: boolean
}

const PostsSection: React.FC<React.PropsWithChildren<IPostsSectionProps>> = ({
  posts,
  loading = false,
  children,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [contentElements, setContentElements] = useState<JSX.Element[]>([])

  const handleGoToContent = async (event: React.MouseEvent<HTMLDivElement>) => {
    const contentResults = await UxComicService.getContent(
      event.currentTarget.id
    )
    const tmpContentElement: JSX.Element[] = []
    contentResults.forEach((content) => {
      const tmp = renderContent(content)
      if (tmp !== null) tmpContentElement.push(tmp)
    })
    setContentElements(tmpContentElement)
    setOpenDialog(true)
  }

  return (
    <div className="flex">
      {!loading && (
        <>
          <div className="grid gap-3 grid-cols-3">
            {posts.map((post) => (
              <UxComicCard
                key={post.id}
                id={post.id}
                onClick={handleGoToContent}
              >
                {post.title}
              </UxComicCard>
            ))}
          </div>
          <UxComicDialog open={openDialog} setOpen={setOpenDialog}>
            {contentElements.map((element) => element)}
          </UxComicDialog>
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default PostsSection
