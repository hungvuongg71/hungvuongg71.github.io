import React, { useState, JSX, useEffect } from 'react'
import { UxComicCard, UxComicDialog, UxComicFlashCard } from './common'
import { useUxComicFlashCard } from '../hooks'
import { getCoverPost, renderContent } from '../helpers/content-helper'
import { Post } from '../uxcomic-types'
import { Button } from '@headlessui/react'
import {
  ArrowUpOnSquareIcon,
  ArrowUturnLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
} from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setIsGrid } from '../redux/slices/list-mode-slice'

interface IPostSectionProps {
  posts: Post[]
}

const PostSection: React.FC<React.PropsWithChildren<IPostSectionProps>> = ({
  posts,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [liked, setLiked] = useState<boolean>(false)
  const [unliked, setUnliked] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<Post>()

  const isGrid = useSelector((state: RootState) => state.listMode.isGrid)
  const dispatch = useDispatch()

  const { props, bind, trans, enableDrag, undoFlashCard } =
    useUxComicFlashCard(posts)

  const handleLoadContent = (event: React.MouseEvent<HTMLDivElement>) => {
    const postId = event.currentTarget.id
    setSelectedPost(posts.find((post) => post.id === postId))
    setOpenDialog(true)
  }

  const handleShareLink = () => {
    if (!selectedPost) return

    if (navigator.share) {
      navigator
        .share({
          title: selectedPost.title,
          text: selectedPost.title,
          url: `${process.env.GATSBY_WEB_ROOT_URL}/post/${selectedPost.id}/`, // URL của bài viết
        })
        .then(() => console.log('Chia sẻ thành công!'))
        .catch((error) => console.error('Lỗi khi chia sẻ:', error))
    } else {
      console.log('Trình duyệt không hỗ trợ Web Share API')
    }
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
                (getCoverPost(posts[i])?.data?.value as string) ||
                posts[i].cover
              }
              title={posts[i].title}
              bind={bind}
              trans={trans}
              onEnableDrag={enableDrag}
              onClick={handleLoadContent}
            ></UxComicFlashCard>
          ))}
        </>
      )}

      {isGrid && (
        <UxComicCard posts={posts} onClick={handleLoadContent}></UxComicCard>
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
      {selectedPost && (
        <UxComicDialog open={openDialog} setOpen={setOpenDialog}>
          <>
            <h1 className="notion-h1 mt-6 mb-4 text-center">
              {selectedPost.title}
            </h1>
            {selectedPost?.content
              ?.filter((cnt) => getCoverPost(selectedPost)?.id !== cnt.id)
              .map((content) => renderContent(content))}
            <div className="w-full h-12 fixed left-0 bottom-6 flex justify-between items-center">
              <div className="flex justify-between items-center w-60 h-12 mx-auto px-7 rounded-full border-2 border-solid border-white bg-white backdrop-blur-lg bg-opacity-75">
                {!liked && (
                  <HandThumbUpIcon
                    className="w-6 h-6"
                    onClick={() => setLiked(true)}
                  />
                )}
                {liked && (
                  <HandThumbUpSolidIcon
                    className="w-6 h-6"
                    onClick={() => setLiked(false)}
                  />
                )}
                <ArrowUpOnSquareIcon
                  className="w-6 h-6 active:opacity-50"
                  onClick={handleShareLink}
                />
                {!unliked && (
                  <HandThumbDownIcon
                    className="w-6 h-6"
                    onClick={() => setUnliked(true)}
                  />
                )}
                {unliked && (
                  <HandThumbDownSolidIcon
                    className="w-6 h-6"
                    onClick={() => setUnliked(false)}
                  />
                )}
              </div>
            </div>
          </>
        </UxComicDialog>
      )}
    </>
  )
}

export default PostSection
