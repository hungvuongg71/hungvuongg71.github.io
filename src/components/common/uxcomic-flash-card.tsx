import { animated, to as interpolate, useSpring } from '@react-spring/web'
import React, { useState } from 'react'
import { SpringValue } from '@react-spring/core/dist/react-spring_core.modern.js'
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types'
import UxComicButton from './uxcomic-button'
import { Helmet } from 'react-helmet'

interface IFlashCardProps {
  id?: string
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
  })

  const toggleZoom = (event: React.MouseEvent<HTMLDivElement>) => {
    set(!open)

    if (onEnableDrag) onEnableDrag(open)
  }

  const handleShareLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: title,
          url: `https://deploy-preview-2--hungvuongg71.netlify.app?postId=${id}`, // URL của bài viết
        })
        .then(() => console.log('Chia sẻ thành công!'))
        .catch((error) => console.error('Lỗi khi chia sẻ:', error))
    } else {
      console.log('Trình duyệt không hỗ trợ Web Share API')
    }
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>

        {/* Open Graph metadata */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${window.location.href}?postId=${id}`}
        />

        {/* Các thẻ khác nếu cần */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={title} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <animated.div
        className="deck"
        key={i}
        style={{
          x,
          y,
          width: width,
          height: height,
          top: top.to((value) => (value === '-1' ? 'auto' : `${value}px`)),
        }}
      >
        <animated.div
          {...bind(i)}
          className="flex flex-col"
          style={{
            transform: interpolate([rot, scale], trans),
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
          <animated.div className="flex-grow" style={{ ...contentStyles }}>
            {children}
            <UxComicButton id={id} onClick={handleShareLink}>
              Share
            </UxComicButton>
          </animated.div>
        </animated.div>
      </animated.div>
    </>
  )
}

export default UxComicFlashCard
