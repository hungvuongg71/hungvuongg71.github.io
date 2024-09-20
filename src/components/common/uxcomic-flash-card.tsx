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
  trans: (r: number, s: number) => string
  bind: (...args: any[]) => ReactDOMAttributes
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const UxComicFlashCard: React.FC<React.PropsWithChildren<IFlashCardProps>> = ({
  id,
  i,
  x,
  y,
  rot,
  scale,
  imageUrl,
  trans,
  bind,
  onClick,
  children,
}) => {
  const [open, set] = useState(false)

  const { top, height } = useSpring({
    to: {
      height: open ? `${window.innerHeight}px` : '400px',
      top: open ? '0' : `${window?.innerHeight / 4}`,
    },
  })

  const toggleZoom = (event: React.MouseEvent<HTMLDivElement>) => {
    set(!open)
  }

  return (
    <animated.div
      className="deck"
      key={i}
      style={{
        x,
        y,
        height: height,
        top: top.to((value) => (value === '-1' ? 'auto' : `${value}px`)),
        backgroundColor: 'lightgreen',
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${imageUrl})`,
          touchAction: 'pan-y',
        }}
        onClick={toggleZoom}
      >
        {children}
      </animated.div>
    </animated.div>
  )
}

export default UxComicFlashCard
