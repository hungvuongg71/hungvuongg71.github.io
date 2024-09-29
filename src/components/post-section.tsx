import React, { useState, JSX } from 'react'
import { UxComicFlashCard } from './common'
import { useUxComicFlashCard } from '../hooks'
import { renderContent } from '../helpers/content-helper'
import { Post, PostContent } from '../uxcomic-types'

interface IPostSectionProps {
  posts: Post[]
  postContent: PostContent[]
}

const PostSection: React.FC<React.PropsWithChildren<IPostSectionProps>> = ({
  posts,
  postContent,
}) => {
  const { props, bind, trans, enableDrag } = useUxComicFlashCard(posts)

  return (
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
          {postContent
            .find((item) => item.id === posts[i].id)
            ?.contents.map((content) => renderContent(content))}
        </UxComicFlashCard>
      ))}
    </>
  )
}

export default PostSection
