import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionH1Props {
  content: Content
}

const NotionH1: React.FC<React.PropsWithChildren<INotionH1Props>> = ({
  content,
  children,
}) => {
  return (
    <h1 key={content.id} className="notion-h1">
      {content.data.value as string}
    </h1>
  )
}

export default NotionH1
