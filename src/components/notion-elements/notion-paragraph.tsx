import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionParagraphProps {
  content: Content
}

const NotionParagraph: React.FC<
  React.PropsWithChildren<INotionParagraphProps>
> = ({ content, children }) => {
  return <p key={content.id}>{content.data}</p>
}

export default NotionParagraph
