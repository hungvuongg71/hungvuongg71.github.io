import React, { useState, JSX } from 'react'
import { Post } from '../services/uxcomic-service'
import { UxComicFlashCard } from './common'
import { ContentList } from '../pages'
import { useUxComicFlashCard } from '../hooks'

interface IPostsSectionProps {
  posts: Post[]
  contentList: ContentList[]
}

const PostsSection: React.FC<React.PropsWithChildren<IPostsSectionProps>> = ({
  posts,
  contentList,
  children,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [contentElements, setContentElements] = useState<JSX.Element[]>([])
  const { props, bind, trans } = useUxComicFlashCard(posts)

  // const handleGoToContent = async (event: React.MouseEvent<HTMLDivElement>) => {
  //   const contentResults =
  //     contentList.find((item) => item.id === event.currentTarget.id)
  //       ?.contents || []
  //   const tmpContentElement: JSX.Element[] = []
  //   contentResults.forEach((content) => {
  //     const tmp = renderContent(content)
  //     if (tmp !== null) tmpContentElement.push(tmp)
  //   })
  //   setContentElements(tmpContentElement)
  //   setOpenDialog(true)
  // }

  return (
    <div className="flex items-center justify-center h-full">
      <>
        {props.map(({ x, y, rot, scale }, i) => (
          <UxComicFlashCard
            key={i}
            i={i}
            x={x}
            y={y}
            rot={rot}
            scale={scale}
            imageUrl={posts[i].cover}
            bind={bind}
            trans={trans}
          >
            Content 123
          </UxComicFlashCard>
        ))}
      </>
    </div>
  )
}

export default PostsSection
