import React, { useEffect, useState } from 'react'
import { UxComicButton } from './common'
import { Tag } from '../uxcomic-types'
import { Button } from '@headlessui/react'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearFilteredPosts,
  selectPostsByTagAndCategory,
} from '../redux/slices/post-slice'
import { setSelectedTag } from '../redux/slices/tag-slice'

interface ITagsSectionProps {}

const TagsSection: React.FC<
  React.PropsWithChildren<ITagsSectionProps>
> = ({}) => {
  const { list: categories, selected: selectedCategory } = useSelector(
    (state: RootState) => state.category
  )

  const {
    filtered: tags,
    selected: selectedTag,
    list: allTags,
  } = useSelector((state: RootState) => state.tag)

  const dispatch = useDispatch()

  useEffect(() => {
    if (tags && !selectedTag) {
      dispatch(setSelectedTag(tags[0]))
    }
  }, [tags, selectedTag])

  const handleLoadPosts = (event: React.MouseEvent<HTMLButtonElement>) => {
    const tagId = event.currentTarget.id

    if (!selectedCategory || tagId == selectedTag?.id) return

    dispatch(clearFilteredPosts())

    setTimeout(() => {
      dispatch(setSelectedTag(allTags.find((tag) => tag.id === tagId)))
      dispatch(
        selectPostsByTagAndCategory({
          categoryId: selectedCategory.id,
          tagId: tagId,
        })
      )
    }, 500)
  }

  return (
    <>
      {tags.map((tag) => (
        <Button
          key={tag.id} // Dùng tag.id làm key duy nhất
          id={tag.id}
          onClick={handleLoadPosts}
          className={`inline-flex items-center justify-center h-9 border border-solid border-black rounded-[8px] py-2 px-3 ${
            tag.id === selectedTag?.id ? '' : 'opacity-20'
          }`}
        >
          {tag.name}
        </Button>
      ))}
    </>
  )
}

export default TagsSection
