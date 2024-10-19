import React from 'react'
import { Content } from '../../uxcomic-types'

interface INotionCallOutProps {
  content: Content
}

const NotionCallOut: React.FC<React.PropsWithChildren<INotionCallOutProps>> = ({
  content,
  children,
}) => {
  return (
    <div
      key={content.id}
      id={content.id}
      className="flex flex-initial bg-white rounded-lg bg-opacity-75 border-2 border-solid border-white p-3 my-4"
    >
      {/* <span>{(content.data as NotionCallout).icon}</span>
      <span className="block ml-2">
        {(content.data as NotionCallout).title}
      </span> */}
    </div>
  )
}

export default NotionCallOut
