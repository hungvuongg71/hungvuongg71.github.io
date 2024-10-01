import React, { JSX } from 'react'
import {
  NotionBulletedListItem,
  NotionCallOut,
  NotionDivider,
  NotionH1,
  NotionH2,
  NotionH3,
  NotionImage,
  NotionNumberedListItem,
  NotionParagraph,
} from '../components/notion-elements'
import { Content } from '../uxcomic-types'

let tmpNumbered = 1

export const renderContent = (content: Content): JSX.Element | null => {
  tmpNumbered = content.type === 'numbered_list_item' ? tmpNumbered + 1 : 0
  switch (content.type) {
    case 'heading_1':
      return <NotionH1 key={content.id} content={content}></NotionH1>
    case 'heading_2':
      return <NotionH2 key={content.id} content={content}></NotionH2>
    case 'heading_3':
      return <NotionH3 key={content.id} content={content}></NotionH3>
    case 'callout':
      return <NotionCallOut key={content.id} content={content}></NotionCallOut>
    case 'bulleted_list_item':
      return (
        <NotionBulletedListItem
          key={content.id}
          content={content}
        ></NotionBulletedListItem>
      )
    case 'numbered_list_item':
      return (
        <NotionNumberedListItem
          key={content.id}
          index={tmpNumbered}
          content={content}
        ></NotionNumberedListItem>
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
