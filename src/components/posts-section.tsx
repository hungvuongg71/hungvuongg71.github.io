import React, { useState, JSX } from 'react'
import { Post } from '../services/uxcomic-service'
import { UxComicFlashCard } from './common'
import { ContentList } from '../pages'
import { useUxComicFlashCard } from '../hooks'
import { renderContent } from '../helpers/content-helper'

interface IPostsSectionProps {
  posts: Post[]
  contentList: ContentList[]
}

interface ContentElementsList {
  id: string
  contentElements: JSX.Element[]
}

const PostsSection: React.FC<React.PropsWithChildren<IPostsSectionProps>> = ({
  posts,
  contentList,
  children,
}) => {
  const { props, bind, trans, enableDrag } = useUxComicFlashCard(posts)

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

  const renderPostContent = () => {}

  return (
    <div className="flex items-center justify-center h-full">
      <>
        {props.map(({ x, y, rot, scale }, i) => (
          <UxComicFlashCard
            id={posts[i].id}
            tagId={posts[i].tagId}
            categoryId={posts[i].categoryId}
            key={i}
            i={i}
            x={x}
            y={y}
            rot={rot}
            scale={scale}
            imageUrl={posts[i].cover}
            title={posts[i].title}
            bind={bind}
            trans={trans}
            onEnableDrag={enableDrag}
          >
            {contentList
              .find((item) => item.id === posts[i].id)
              ?.contents.map((content) => renderContent(content))}
          </UxComicFlashCard>
        ))}
      </>
    </div>
  )
}

export default PostsSection
