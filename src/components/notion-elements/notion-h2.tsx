import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionH1Props {
  content: Content
}

const NotionH2: React.FC<React.PropsWithChildren<INotionH1Props>> = ({
  content,
  children,
}) => {
  return (
    <h2 key={content.id} className="notion-h2">
      {content.data as string}
    </h2>
  )
}

export default NotionH2
