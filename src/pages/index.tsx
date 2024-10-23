import React, { useState, useEffect } from 'react'
import { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/layout'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { selectTagsByCategory } from '../redux/slices/tag-slice'
import { setSelectedCategory } from '../redux/slices/category-slice'
import {
  selectPostsByTagAndCategory,
  setSelectedPost,
} from '../redux/slices/post-slice'
import PostSection from '../components/post-section'
import { useLocation } from '@reach/router'
import CategorySection from '../components/category-section'
import { useUxComicData } from '../hooks/use-uxcomic-data'
import { Button } from '@headlessui/react'
import TagsSection from '../components/tag-section'

interface IIndexPageProps extends PageProps {}

const IndexPage: React.FC<React.PropsWithChildren<IIndexPageProps>> = () => {
  /**
   * STATES
   */

  /**
   * OTHER HOOKS
   */
  const location = useLocation()
  const { loadTags } = useUxComicData()

  /**
   * REDUX HOOKS
   */
  const { list: categories, selected: selectedCategory } = useSelector(
    (state: RootState) => state.category
  )
  const { selected: selectedTag, list: allTags } = useSelector(
    (state: RootState) => state.tag
  )
  const { filtered: posts, list: allPosts } = useSelector(
    (state: RootState) => state.post
  )
  const isGrid = useSelector((state: RootState) => state.listMode.isGrid)
  const dispatch = useDispatch()

  /**
   * USEEFFECTS
   */
  useEffect(() => {
    if (!categories.length) return
    dispatch(setSelectedCategory(categories[0]))
    dispatch(selectTagsByCategory(categories[0].id))
  }, [categories])

  useEffect(() => {
    if (!selectedCategory || !selectedTag) return

    dispatch(
      selectPostsByTagAndCategory({
        categoryId: selectedCategory.id,
        tagId: selectedTag.id,
      })
    )
  }, [selectedCategory, selectedTag])

  useEffect(() => {
    if (!location) return
    const params = new URLSearchParams(location.search)
    const postId = params.get('postId')
    const tagId = params.get('tagId')
    const categoryId = params.get('categoryId')
    if (
      !postId ||
      !tagId ||
      !categoryId ||
      !categories.length ||
      !allTags.length ||
      !allPosts.length
    )
      return

    const loadedCategory = categories.find(
      (category) => category.id === categoryId
    )
    if (!loadedCategory) return

    loadTags(loadedCategory.id)
    const loadedTag = allTags.find(
      (tag) => tag.categoryId === loadedCategory.id && tag.id === tagId
    )

    if (!loadedTag) return
    const loadedPost = allPosts.find((post) => post.id === postId)

    if (!loadedPost) return

    dispatch(setSelectedPost(loadedPost))
  }, [location, categories, allTags, allPosts])

  /**
   * HANDLERS
   */

  return (
    <Layout>
      <div className="pl-6 py-2">
        {/** CATEGORY SECTION */}
        <div className="flex flex-nowrap items-center">
          <CategorySection />
        </div>

        {/** TAG SECTION */}
        <div className="flex flex-nowrap space-x-2 mt-3 overflow-x-auto">
          <TagsSection />
        </div>
      </div>

      <div className="grow overflow-hidden">
        {/** POST SECTION */}
        <div className="flex items-center justify-center h-full flex-col">
          <PostSection posts={posts} />
        </div>
      </div>

      {/** FOOTER SECTION */}
      {!isGrid && (
        <div className="h-11">
          <p className="font-uxcomic-manrope-regular text-center text-uxcomic-footer">
            <span className="text-uxcomic-text-tertiary">Built with</span>
            <span> ❤️ </span>
            <span className="text-uxcomic-text-tertiary"> by </span>
            <b className="text-uxcomic-text-tertiary underline underline-offset-1">
              UXcomic
            </b>
          </p>
        </div>
      )}
    </Layout>
  )
}

export const Head: HeadFC = ({ location, params, data, pageContext }) => {
  return (
    <>
      <title>UXComic</title>
      <meta property="og:title" content="UXcomic" />
      <meta property="og:description" content="UXcomic" />
      <meta
        property="og:image"
        content="https://prod-files-secure.s3.us-west-2.amazonaws.com/bbbed9fd-0db9-45f7-8f82-bd0944c25a2d/df9019ef-3650-4c5e-8d06-815ff268d5d8/Lets_your_work_speak_themselves_be_like.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240923%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240923T093734Z&X-Amz-Expires=3600&X-Amz-Signature=d0687184912fa7b743510e718e7b60034c8c9a45d46aa7375de8f47d783d3ad0&X-Amz-SignedHeaders=host&x-id=GetObject"
      />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={`https://deploy-preview-2--hungvuongg71.netlify.app/`}
      />
    </>
  )
}

export default IndexPage
