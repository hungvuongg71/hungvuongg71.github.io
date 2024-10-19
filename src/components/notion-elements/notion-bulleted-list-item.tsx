import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionBulletedListItemProps {
  content: Content
}

const NotionBulletedListItem: React.FC<
  React.PropsWithChildren<INotionBulletedListItemProps>
> = ({ content, children }) => {
  return (
    <p key={content.id} id={content.id} className="flex flex-initial mb-1">
      <span className="inline-block flex-shrink-0 w-[0.4rem] h-[0.4rem] bg-black rounded-full mt-[0.6rem]"></span>
      <span className="block ml-3">{content.data.value as string}</span>
    </p>
  )
}

export default NotionBulletedListItem
