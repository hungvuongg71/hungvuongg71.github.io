import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionNumberedListItemProps {
  index: number
  content: Content
}

const NotionNumberedListItem: React.FC<
  React.PropsWithChildren<INotionNumberedListItemProps>
> = ({ index, content, children }) => {
  return (
    <p key={content.id} id={content.id} className="flex flex-initial mb-1">
      <span>{index}.</span>
      <span className="block ml-3">{content.data.value as string}</span>
    </p>
  )
}

export default NotionNumberedListItem
