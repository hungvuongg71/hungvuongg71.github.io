import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ITransitionCardProps {
  id?: string
  image: string
}

const UxComicTransitionCard: React.FC<
  React.PropsWithChildren<ITransitionCardProps>
> = ({ id, image, children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  return (
    <motion.div
      layout
      id={id}
      onClick={handleFullScreen}
      style={{
        backgroundColor: 'lightgrey',
        width: isFullScreen ? '100vw' : 'auto',
        height: isFullScreen ? '100vh' : 'auto',
        position: isFullScreen ? 'absolute' : 'static',
        top: isFullScreen ? '0' : 'auto',
        left: isFullScreen ? '0' : 'auto',
      }}
      className="flex justify-center items-center"
    >
      <motion.div layout>
        <motion.div
          animate={{ y: isFullScreen ? -200 : 0 }}
          transition={{ delay: 0.1, ease: 'easeInOut' }}
        >
          <img src={image} alt="demo" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default UxComicTransitionCard
