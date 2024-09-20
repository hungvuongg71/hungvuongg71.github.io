import React, { useState, JSX, useEffect } from 'react'
import { Post, UxComicService } from '../services/uxcomic-service'
import { UxComicCard, UxComicDialog, UxComicFlashCard } from './common'
import { renderContent } from '../helpers/content-helper'
import { ContentList } from '../pages'

interface IPostsSectionProps {
  posts: Post[]
  contentList: ContentList[]
  loading: boolean
}

const PostsSection: React.FC<React.PropsWithChildren<IPostsSectionProps>> = ({
  posts,
  contentList,
  loading = false,
  children,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [contentElements, setContentElements] = useState<JSX.Element[]>([])
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    if (loading) return
    console.log(contentList)
  }, [loading])

  const handleGoToContent = async (event: React.MouseEvent<HTMLDivElement>) => {
    const contentResults =
      contentList.find((item) => item.id === event.currentTarget.id)
        ?.contents || []
    const tmpContentElement: JSX.Element[] = []
    contentResults.forEach((content) => {
      const tmp = renderContent(content)
      if (tmp !== null) tmpContentElement.push(tmp)
    })
    setContentElements(tmpContentElement)
    setOpenDialog(true)
  }

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  return (
    <div className="flex items-center justify-center h-full">
      {!loading && (
        <>
          {posts.map((post) => (
            <UxComicFlashCard
              key={post.id}
              id={post.id}
              // onClick={handleGoToContent}
            ></UxComicFlashCard>
          ))}
          {/* <UxComicDialog open={openDialog} setOpen={setOpenDialog}>
            {contentElements.map((element) => element)}
          </UxComicDialog> */}
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default PostsSection
