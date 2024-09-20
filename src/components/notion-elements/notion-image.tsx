import React from 'react'
import { Content } from '../../services/uxcomic-service'

interface INotionImageProps {
  content: Content
}

const NotionImage: React.FC<React.PropsWithChildren<INotionImageProps>> = ({
  content,
  children,
}) => {
  return <img src={content.data} alt={content.type}></img>
}

export default NotionImage