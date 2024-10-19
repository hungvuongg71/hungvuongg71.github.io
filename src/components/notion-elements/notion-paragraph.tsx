import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionParagraphProps {
  content: Content
}

const NotionParagraph: React.FC<
  React.PropsWithChildren<INotionParagraphProps>
> = ({ content, children }) => {
  return (
    <p key={content.id} className="notion-body">
      {content.data.value as string}
    </p>
  )
}

export default NotionParagraph
