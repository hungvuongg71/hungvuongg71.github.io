import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategory } from '../redux/slices/category-slice'
import { selectTagsByCategory, setSelectedTag } from '../redux/slices/tag-slice'
import { RootState } from '../redux/store'
import { clearFilteredPosts } from '../redux/slices/post-slice'

export const useUxComicData = () => {
  const { list: categories } = useSelector((state: RootState) => state.category)

  const dispatch = useDispatch()

  const loadTags = (categoryId: string) => {
    dispatch(clearFilteredPosts())

    setTimeout(() => {
      dispatch(
        setSelectedCategory(
          categories.find((category) => category.id === categoryId) || undefined
        )
      )
      dispatch(selectTagsByCategory(categoryId))
      dispatch(setSelectedTag(undefined))
    }, 150)
  }

  return {
    loadTags,
  }
}
