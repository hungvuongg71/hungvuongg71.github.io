import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionImageProps {
  content: Content
}

const NotionImage: React.FC<React.PropsWithChildren<INotionImageProps>> = ({
  content,
  children,
}) => {
  return (
    <img
      src={content.data.value as string}
      alt={content.type}
      className="rounded-lg my-4"
    ></img>
  )
}

export default NotionImage
