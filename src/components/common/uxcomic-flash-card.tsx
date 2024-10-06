import { animated, to as interpolate, useSpring } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import { SpringValue } from '@react-spring/core/dist/react-spring_core.modern.js'
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setSelectedPost } from '../../redux/slices/post-slice'
import {
  XMarkIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline'
import {
  HandThumbDownIcon as HandThumbDownSolidIcon,
  HandThumbUpIcon as HandThumbUpSolidIcon,
} from '@heroicons/react/24/solid'
import { Button } from '@headlessui/react'

interface IFlashCardProps {
  id?: string
  tagId?: string
  categoryId?: string
  i: number
  x: SpringValue<number>
  y: SpringValue<number>
  rot: SpringValue<number>
  scale: SpringValue<number>
  imageUrl?: string
  title?: string
  trans: (r: number, s: number) => string
  bind: (...args: any[]) => ReactDOMAttributes
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  onEnableDrag?: (isEnabled: boolean) => void
}

const UxComicFlashCard: React.FC<React.PropsWithChildren<IFlashCardProps>> = ({
  id,
  i,
  x,
  y,
  rot,
  scale,
  imageUrl,
  title,
  trans,
  bind,
  onClick,
  onEnableDrag,
  children,
}) => {
  const [open, set] = useState(false)
  const [isRotatedCard, setIsRotatedCard] = useState<boolean>(true)
  const [liked, setLiked] = useState<boolean>(false)
  const [unliked, setUnliked] = useState<boolean>(false)

  const selectedPost = useSelector((state: RootState) => state.post.selected)
  const dispatch = useDispatch()

  const deckSpring = useSpring({
    to: {
      width: open ? `${window.innerWidth}px` : '272px',
      minHeight: open ? undefined : '356px',
      top: open ? 0 : 128,
      padding: open ? '4px' : '0',
    },
  })

  const cardSpring = useSpring({
    to: {
      width: open ? `136px` : '272px',
      height: open ? `178px` : '356px',
      top: open ? '0' : `${128}`,
      padding: open ? '4px' : '8px',
    },
  })

  const imageSpring = useSpring({
    to: {
      width: open ? '137.55px' : '280px',
      height: open ? '144.09px' : '280px',
      marginTop: open ? '20px' : '0px',
      marginBottom: open ? '20px' : '0px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  })

  const titleSpring = useSpring({
    to: {
      fontSize: open ? '6px' : '16px',
      paddingTop: open ? '5px' : '28px',
      paddingBottom: open ? '5px' : '28px',
    },
  })

  const contentStyles = useSpring({
    to: {
      y: open ? '0px' : '100px',
      x: 0,
      opacity: open ? 1 : 0,
      padding: '12px',
      width: `100%`,
      height: open ? '100%' : '0',
      overflow: open ? 'visible' : 'hidden',
      touchAction: 'pan-y',
    },
    config: {
      duration: 280,
    },
    delay: open ? 200 : 0,
    immediate: open ? false : true,
  })

  useEffect(() => {
    if (!selectedPost || selectedPost.id !== id) return
    toggleZoom()
    setIsRotatedCard(false)
  }, [selectedPost])

  const toggleZoom = () => {
    if (open) dispatch(setSelectedPost(undefined))
    set(!open)
    if (onEnableDrag) onEnableDrag(open)
    if (!isRotatedCard) setIsRotatedCard(true)
  }

  const handleShareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: title,
          url: `${process.env.GATSBY_WEB_ROOT_URL}/post/${id}/`, // URL của bài viết
        })
        .then(() => console.log('Chia sẻ thành công!'))
        .catch((error) => console.error('Lỗi khi chia sẻ:', error))
    } else {
      console.log('Trình duyệt không hỗ trợ Web Share API')
    }
  }

  return (
    <>
      <animated.div
        className={`deck ${open ? 'bg-uxcomic-bg' : 'flex flex-col'}`}
        key={i}
        style={{
          x,
          y,
          width: deckSpring.width,
          height: 'auto',
          minHeight: deckSpring.minHeight,
          padding: deckSpring.padding,
          top: deckSpring.top.to((value) =>
            value === -1 ? 'auto' : `${value}px`
          ),
          zIndex: open ? 9999 : 'auto',
        }}
      >
        <Button
          className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-75 rounded-full border-2 border-solid border-white flex justify-center items-center"
          onClick={toggleZoom}
        >
          <XMarkIcon className="w-6 h-6" />
        </Button>
        <animated.div
          {...bind(i)}
          className="flex flex-col justify-center uxcomic-card"
          style={{
            left: '50%',
            transform: !isRotatedCard
              ? 'none'
              : interpolate([rot, scale], trans),
            touchAction: 'pan-y',
            overflowY: open ? 'auto' : 'hidden',
            width: cardSpring.width,
            height: cardSpring.height,
            padding: cardSpring.padding,
            margin: '0 auto',
          }}
          onClick={toggleZoom}
        >
          <div className="flex flex-col h-full border border-solid border-uxcomic-divider overflow-hidden rounded-lg">
            <animated.div
              className="grow bg-cover bg-center rounded-t-lg"
              style={{
                width: imageSpring.width,
                height: imageSpring.height,
                backgroundImage: `url(${imageUrl})`,
              }}
            ></animated.div>
            <animated.div
              style={{
                fontSize: titleSpring.fontSize,
                paddingTop: titleSpring.paddingTop,
                paddingBottom: titleSpring.paddingBottom,
              }}
              className="flex flex-col py-7 px-4 items-center justify-center border-t card-title-medium text-center relative"
            >
              <div
                className={`border border-solid border-x-uxcomic-divider rounded-full px-2 absolute top-[-14px] bg-white ${open ? 'scale-50' : ''}`}
              >
                <span className="inline-block w-6 h-6">⚓</span>
                <span className="inline-block w-6 h-6">⚓</span>
                <span className="inline-block w-6 h-6">⚓</span>
              </div>
              {title}
            </animated.div>
          </div>
        </animated.div>
        <animated.div style={{ ...contentStyles }}>
          <h1 className="notion-h1 mt-6 mb-4 text-center">{title}</h1>
          {children}
          <div className="flex justify-between items-center w-60 h-12 mx-auto mt-6 px-7 rounded-full border-2 border-solid border-white bg-white backdrop-blur-lg bg-opacity-75 utility-sticky bottom-6">
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
        </animated.div>
      </animated.div>
    </>
  )
}

export default UxComicFlashCard
