import React, { useState, JSX, useEffect } from 'react'
import { UxComicFlashCard } from './common'
import { useUxComicFlashCard } from '../hooks'
import { renderContent } from '../helpers/content-helper'
import { Content, Post, PostContent } from '../uxcomic-types'
import { Button } from '@headlessui/react'
import { ArrowUturnLeftIcon, Squares2X2Icon } from '@heroicons/react/24/outline'

interface IPostSectionProps {
  posts: Post[]
  postContent: PostContent[]
}

const PostSection: React.FC<React.PropsWithChildren<IPostSectionProps>> = ({
  posts,
  postContent,
}) => {
  const { props, bind, trans, enableDrag, undoFlashCard } =
    useUxComicFlashCard(posts)

  // Get cover post
  const getCoverPost = (post: Post): Content | undefined => {
    let content = postContent.find((cnt) => cnt.id === post.id)?.contents
    let firstImg = content?.find((cnt) => cnt.type === 'image')
    return firstImg
  }

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
          imageUrl={(getCoverPost(posts[i])?.data as string) || posts[i].cover}
          title={posts[i].title}
          bind={bind}
          trans={trans}
          onEnableDrag={enableDrag}
        >
          {postContent
            .find((item) => item.id === posts[i].id)
            ?.contents.filter((cnt) => getCoverPost(posts[i])?.id !== cnt.id)
            .map((content) => renderContent(content))}
        </UxComicFlashCard>
      ))}

      {posts.length > 0 && (
        <div className="flex justify-center space-x-10 py-3 absolute top-[524px]">
          <Button
            className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-75 rounded-full border-2 border-solid border-white active:opacity-50"
            onClick={undoFlashCard}
          >
            <ArrowUturnLeftIcon className="w-6 h-6" />
          </Button>
          <Button className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-75 rounded-full border-2 border-solid border-white">
            <Squares2X2Icon className="w-6 h-6" />
          </Button>
        </div>
      )}
    </>
  )
}

export default PostSection
