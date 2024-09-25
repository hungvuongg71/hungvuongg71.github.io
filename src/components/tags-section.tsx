import React, { useState } from 'react'
import { UxComicButton } from './common'
import { Tag } from '../uxcomic-types'

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
