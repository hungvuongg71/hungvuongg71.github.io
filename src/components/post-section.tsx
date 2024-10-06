import React, { useState, JSX, useEffect } from 'react'
import { UxComicDialog, UxComicFlashCard } from './common'
import { useUxComicFlashCard } from '../hooks'
import { renderContent } from '../helpers/content-helper'
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
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<Post>()

  const isGrid = useSelector((state: RootState) => state.listMode.isGrid)
  const dispatch = useDispatch()

  const { props, bind, trans, enableDrag, undoFlashCard } =
    useUxComicFlashCard(posts)

  // Get cover post
  const getCoverPost = (post: Post): Content | undefined => {
    let content = postContent.find((cnt) => cnt.id === post.id)?.contents
    let firstImg = content?.find((cnt) => cnt.type === 'image')
    return firstImg
  }

  const handleLoadContent = (event: React.MouseEvent<HTMLDivElement>) => {
    const postId = event.currentTarget.id
    setSelectedPost(posts.find((post) => post.id === postId))
    setOpenDialog(true)
  }

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
                (getCoverPost(posts[i])?.data as string) || posts[i].cover
              }
              title={posts[i].title}
              bind={bind}
              trans={trans}
              onEnableDrag={enableDrag}
            >
              {postContent
                .find((item) => item.id === posts[i].id)
                ?.contents.filter(
                  (cnt) => getCoverPost(posts[i])?.id !== cnt.id
                )
                .map((content) => renderContent(content))}
            </UxComicFlashCard>
          ))}
        </>
      )}

      {isGrid && (
        <>
          <div className="grid grid-cols-2 grid-flow-row auto-rows-max gap-2 w-full h-full px-6 pb-16">
            {posts.map((post) => (
              <div
                key={post.id}
                id={post.id}
                className="flex flex-col p-2 bg-white rounded-md shadow-[0px_2px_8px_rgba(0,0,0,0.1)]"
                onClick={handleLoadContent}
              >
                <div className="border border-solid border-uxcomic-divider rounded-sm">
                  <div
                    className="grow bg-cover bg-center h-40"
                    style={{
                      backgroundImage: `url(${(getCoverPost(post)?.data as string) || post.cover})`,
                    }}
                  ></div>
                  <h1 className="card-title-medium text-center border-t-[1px] pt-4 pb-2 px-2">
                    {post.title}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <UxComicDialog open={openDialog} setOpen={setOpenDialog}>
            {selectedPost && (
              <>
                <h1 className="notion-h1 mt-6 mb-4 text-center">
                  {selectedPost.title}
                </h1>
                {postContent
                  .find((item) => item.id === selectedPost?.id)
                  ?.contents.filter(
                    (cnt) => getCoverPost(selectedPost)?.id !== cnt.id
                  )
                  .map((content) => renderContent(content))}
              </>
            )}
          </UxComicDialog>
        </>
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
