import React, { JSX } from 'react'
import {
  NotionBulletedListItem,
  NotionDivider,
  NotionH1,
  NotionH2,
  NotionH3,
  NotionImage,
  NotionParagraph,
} from '../components/notion-elements'
import { Content } from '../uxcomic-types'

export const renderContent = (content: Content): JSX.Element | null => {
  switch (content.type) {
    case 'heading_1':
      return <NotionH1 key={content.id} content={content}></NotionH1>
    case 'heading_2':
      return <NotionH2 key={content.id} content={content}></NotionH2>
    case 'heading_3':
      return <NotionH3 key={content.id} content={content}></NotionH3>
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
    case 'divider':
      return <NotionDivider key={content.id} content={content}></NotionDivider>
  }
  return null
}
