import React, { JSX } from 'react'
import {
  NotionBulletedListItem,
  NotionImage,
  NotionParagraph,
} from '../components/notion-elements'
import { Content } from '../uxcomic-types'

export const renderContent = (content: Content): JSX.Element | null => {
  switch (content.type) {
    case 'bulleted_list_item':
      return (
        <NotionBulletedListItem
          key={content.id}
          content={content}
        ></NotionBulletedListItem>
      )
    case 'image':
      return <NotionImage key={content.id} content={content}></NotionImage>
    case 'paragraph':
      return (
        <NotionParagraph key={content.id} content={content}></NotionParagraph>
      )
  }
  return null
}
