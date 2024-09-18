import React, { useState } from 'react'
import { Tag } from '../services/uxcomic-service'
import { UxComicButton } from './common'

interface ITagsSectionProps {
  tags: Tag[]
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const TagsSection: React.FC<React.PropsWithChildren<ITagsSectionProps>> = ({
  tags,
  onButtonClick,
  children,
}) => {
  return (
    <div className="flex flex-flex-nowrap mb-2">
      {tags.map((tag) => (
        <UxComicButton
          key={tag.id}
          id={tag.id}
          databaseId={tag.databaseId}
          onClick={onButtonClick}
        >
          {tag.name}
        </UxComicButton>
      ))}
    </div>
  )
}

export default TagsSection
