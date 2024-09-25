import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Content } from '../../uxcomic-types'

interface INotionBulletedListItemProps {
  content: Content
}

const NotionBulletedListItem: React.FC<
  React.PropsWithChildren<INotionBulletedListItemProps>
> = ({ content, children }) => {
  return (
    <p key={content.id} id={content.id} className="flex">
      <ChevronRightIcon className="text-blue-500 basis-1" />
      <span className="flex-1">{content.data}</span>
    </p>
  )
}

export default NotionBulletedListItem
