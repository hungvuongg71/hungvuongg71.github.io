import { animated, to as interpolate, useSpring } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import { SpringValue } from '@react-spring/core/dist/react-spring_core.modern.js'
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types'
import UxComicButton from './uxcomic-button'
import { useLocation } from '@reach/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setSelectedPost } from '../../redux/slices/post-slice'

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

  const selectedPost = useSelector((state: RootState) => state.post.selected)
  const dispatch = useDispatch()

  const { top, width, height } = useSpring({
    to: {
      width: open ? `${window.innerWidth}px` : '250px',
      height: open ? `${window.innerHeight}px` : '385px',
      top: open ? '0' : `${window?.innerHeight / 4}`,
    },
  })

  const cardStyles = useSpring({
    to: {
      width: open ? `${window.innerWidth}px` : '250px',
      height: open ? `${window.innerHeight}px` : '385px',
      maxWidth: open ? '100%' : undefined,
      maxHeight: open ? '100%' : undefined,
    },
  })

  const imageStyles = useSpring({
    to: {
      width: open ? `200px` : '250px',
      marginTop: open ? '20px' : '0px',
      marginBottom: open ? '20px' : '0px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: open ? '20px' : '16px',
    },
  })

  const contentStyles = useSpring({
    to: {
      y: open ? '0px' : '100px',
      x: 0,
      opacity: open ? 1 : 0,
      padding: '12px',
      width: `${window.innerWidth}px`,
      height: open ? '100%' : '0px',
      overflow: open ? 'visible' : 'hidden',
    },
    config: {
      duration: 280,
    },
    delay: open ? 200 : 0,
    immediate: open ? false : true,
  })

  useEffect(() => {
    if (!selectedPost || selectedPost.id !== id) return
    toggleZoom(undefined)
    setIsRotatedCard(false)
  }, [selectedPost])

  const toggleZoom = (event: React.MouseEvent<HTMLDivElement> | undefined) => {
    if (open) dispatch(setSelectedPost(undefined))
    set(!open)
    if (onEnableDrag) onEnableDrag(open)
    if (!isRotatedCard) setIsRotatedCard(true)
  }

  const handleShareLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
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
        className="deck"
        key={i}
        style={{
          x,
          y,
          width: width,
          height: height,
          top: top.to((value) => (value === '-1' ? 'auto' : `${value}px`)),
          zIndex: open ? 9999 : 'auto',
        }}
      >
        <animated.div
          {...bind(i)}
          className="flex flex-col"
          style={{
            transform: !isRotatedCard
              ? 'none'
              : interpolate([rot, scale], trans),
            touchAction: 'pan-y',
            overflowY: open ? 'auto' : 'hidden',
            position: 'relative',
            ...cardStyles,
          }}
          onClick={toggleZoom}
        >
          <animated.div
            style={{
              ...imageStyles,
            }}
          >
            <img src={imageUrl} alt="demo" />
            <h1 className="font-bold text-center">{title}</h1>
          </animated.div>
          <animated.div className="grow" style={{ ...contentStyles }}>
            <UxComicButton key={id} id={id} onClick={handleShareLink}>
              Share
            </UxComicButton>
            {children}
          </animated.div>
        </animated.div>
      </animated.div>
    </>
  )
}

export default UxComicFlashCard
