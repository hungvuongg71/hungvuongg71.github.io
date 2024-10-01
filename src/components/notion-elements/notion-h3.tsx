import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionH1Props {
  content: Content
}

const NotionH3: React.FC<React.PropsWithChildren<INotionH1Props>> = ({
  content,
  children,
}) => {
  return (
    <h3 key={content.id} className="notion-h3">
      {content.data as string}
    </h3>
  )
}

export default NotionH3
