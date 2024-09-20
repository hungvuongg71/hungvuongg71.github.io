import React from 'react'
import { Content } from '../../services/uxcomic-service'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

interface INotionBulletedListItemProps {
  content: Content
}

const NotionBulletedListItem: React.FC<
  React.PropsWithChildren<INotionBulletedListItemProps>
> = ({ content, children }) => {
  return (
    <p className="flex">
      <ChevronRightIcon className="text-blue-500 basis-1" />
      <span className="flex-1">{content.data}</span>
    </p>
  )
}

export default NotionBulletedListItem
