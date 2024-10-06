import React, { useState, JSX, useEffect } from 'react'
import { UxComicCard, UxComicDialog, UxComicFlashCard } from './common'
import { useUxComicFlashCard } from '../hooks'
import { getCoverPost, renderContent } from '../helpers/content-helper'
import { Content, Post, PostContent } from '../uxcomic-types'
import { Button } from '@headlessui/react'
import {
  ArrowUturnLeftIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setIsGrid } from '../redux/slices/list-mode-slice'

interface IPostSectionProps {
  posts: Post[]
  postContent: PostContent[]
}

const PostSection: React.FC<React.PropsWithChildren<IPostSectionProps>> = ({
  posts,
  postContent,
}) => {
  const isGrid = useSelector((state: RootState) => state.listMode.isGrid)
  const dispatch = useDispatch()

  const { props, bind, trans, enableDrag, undoFlashCard } =
    useUxComicFlashCard(posts)

  return (
    <>
      {!isGrid && (
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
              imageUrl={
                (getCoverPost(posts[i], postContent)?.data as string) ||
                posts[i].cover
              }
              title={posts[i].title}
              bind={bind}
              trans={trans}
              onEnableDrag={enableDrag}
            >
              {postContent
                .find((item) => item.id === posts[i].id)
                ?.contents.filter(
                  (cnt) => getCoverPost(posts[i], postContent)?.id !== cnt.id
                )
                .map((content) => renderContent(content))}
            </UxComicFlashCard>
          ))}
        </>
      )}

      {isGrid && (
        <UxComicCard posts={posts} postContent={postContent}></UxComicCard>
      )}

      {posts.length > 0 && (
        <div
          className={`flex justify-center space-x-10 py-3 absolute ${!isGrid ? 'top-[524px]' : 'top-[564px] z-10 uxcomic-grid-bg'}`}
        >
          {!isGrid && (
            <>
              <Button
                className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-75 rounded-full border-2 border-solid border-white active:opacity-50"
                onClick={undoFlashCard}
              >
                <ArrowUturnLeftIcon className="w-6 h-6" />
              </Button>
              <Button
                className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-75 rounded-full border-2 border-solid border-white"
                onClick={() => dispatch(setIsGrid(true))}
              >
                <Squares2X2Icon className="w-6 h-6" />
              </Button>
            </>
          )}
          {isGrid && (
            <Button
              className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-75 rounded-full border-2 border-solid border-white"
              onClick={() => dispatch(setIsGrid(false))}
            >
              <XMarkIcon className="w-6 h-6" />
            </Button>
          )}
        </div>
      )}
    </>
  )
}

export default PostSection
