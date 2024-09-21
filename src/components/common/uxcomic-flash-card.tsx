import { animated, to as interpolate, useSpring } from '@react-spring/web'
import React, { useState } from 'react'
import { SpringValue } from '@react-spring/core/dist/react-spring_core.modern.js'
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types'

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
      width: open ? `${window.innerHeight}px` : '250px',
      height: open ? `${window.innerHeight}px` : '385px',
      top: open ? '0' : `${window?.innerHeight / 4}`,
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
      y: open ? '0px' : '30px',
      opacity: open ? 1 : 0,
      padding: '12px',
    },
  })

  const toggleZoom = (event: React.MouseEvent<HTMLDivElement>) => {
    set(!open)

    if (onEnableDrag) onEnableDrag(open)
  }

  return (
    <animated.div
      className="deck"
      key={i}
      style={{
        x,
        y,
        width: width,
        height: height,
        top: top.to((value) => (value === '-1' ? 'auto' : `${value}px`)),
        backgroundColor: 'lightgreen',
      }}
    >
      <animated.div
        {...bind(i)}
        className="flex flex-col"
        style={{
          transform: open ? 'none' : interpolate([rot, scale], trans),
          touchAction: open ? 'none' : 'pan-y',
          width: open ? `${window.innerWidth}px` : undefined,
          height: open ? `${window.innerHeight}px` : undefined,
          maxWidth: open ? '100%' : undefined,
          maxHeight: open ? '100%' : undefined,
          overflowY: open ? 'auto' : 'hidden',
          position: 'relative',
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
        </animated.div>
      </animated.div>
    </animated.div>
  )
}

export default UxComicFlashCard
