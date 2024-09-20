import { animated, to as interpolate } from '@react-spring/web'
import React from 'react'
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
  return (
    <animated.div className="deck" key={i} style={{ x, y }}>
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${imageUrl})`,
          touchAction: 'pan-y',
        }}
      >
        {children}
      </animated.div>
    </animated.div>
  )
}

export default UxComicFlashCard
