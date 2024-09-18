import React, { JSX } from 'react'
import { Content } from '../services/uxcomic-service'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export const renderContent = (content: Content): JSX.Element | null => {
  switch (content.type) {
    case 'bulleted_list_item':
      return (
        <p key={content.id} className="flex">
          <ChevronRightIcon className="text-blue-500 basis-1" />
          <span className="flex-1">{content.data}</span>
        </p>
      )
    case 'image':
      return <img key={content.id} src={content.data}></img>
    case 'paragraph':
      return <p key={content.id}>{content.data}</p>
  }
  return null
}
