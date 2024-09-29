import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategory } from '../redux/slices/category-slice'
import { selectTagsByCategory, setSelectedTag } from '../redux/slices/tag-slice'
import { RootState } from '../redux/store'
import { PostContent } from '../uxcomic-types'
import { UxComicService } from '../services/uxcomic-service'
import { selectPostsByTagAndCategory } from '../redux/slices/post-slice'

export const useUxComicData = () => {
  const [postContent, setPostContent] = useState<PostContent[]>([])
  const [loadingContents, setLoadingContents] = useState<boolean>(false)

  const { list: categories } = useSelector((state: RootState) => state.category)
  const { list: allTags } = useSelector((state: RootState) => state.tag)
  const { list: allPosts } = useSelector((state: RootState) => state.post)

  const dispatch = useDispatch()

  const loadTags = (categoryId: string) => {
    dispatch(
      setSelectedCategory(
        categories.find((category) => category.id === categoryId) || undefined
      )
    )
    dispatch(selectTagsByCategory(categoryId))
    dispatch(setSelectedTag(undefined))
    const filteredTags = allTags.filter((tag) => tag.categoryId == categoryId)
    fetchContent(filteredTags[0].id, categoryId)
  }

  const fetchContent = async (tagId: string, categoryId: string) => {
    setLoadingContents(true)
    dispatch(
      setSelectedTag(allTags.find((tag) => tag.id === tagId) || undefined)
    )
    const tmp: PostContent[] = []
    const tmpFilteredPosts = allPosts.filter(
      (post) => post.tagId === tagId && post.categoryId === categoryId
    )
    for (let i = 0; i < tmpFilteredPosts.length; i++) {
      const post = tmpFilteredPosts[i]
      const contents = await UxComicService.getContent(post.id)
      tmp.push({ id: post.id, contents })
    }
    setPostContent(tmp)
    dispatch(
      selectPostsByTagAndCategory({
        tagId,
        categoryId,
      })
    )
    setLoadingContents(false)
  }

  return {
    postContent,
    loadingContents,
    loadTags,
    fetchContent,
  }
}
