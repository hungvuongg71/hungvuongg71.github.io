import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionImageProps {
  content: Content
}

const NotionImage: React.FC<React.PropsWithChildren<INotionImageProps>> = ({
  content,
  children,
}) => {
  return <img src={content.data as string} alt={content.type}></img>
}

export default NotionImage
