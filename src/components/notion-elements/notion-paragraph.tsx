import React from 'react'
import { Content } from '../../services/uxcomic-service'

interface INotionParagraphProps {
  content: Content
}

const NotionParagraph: React.FC<
  React.PropsWithChildren<INotionParagraphProps>
> = ({ content, children }) => {
  return <p>{content.data}</p>
}

export default NotionParagraph
