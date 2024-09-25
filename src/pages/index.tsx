import React, { useState, useEffect } from 'react'
import { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/layout'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { selectTagsByCategory, setSelectedTag } from '../redux/slices/tag-slice'
import { setSelectedCategory } from '../redux/slices/category-slice'
import { selectPostsByTagAndCategory } from '../redux/slices/post-slice'
import { PostContent } from '../uxcomic-types'
import { UxComicService } from '../services/uxcomic-service'
import PostSection from '../components/posts-section'

interface IIndexPageProps extends PageProps {}

const IndexPage: React.FC<React.PropsWithChildren<IIndexPageProps>> = () => {
  /**
   * STATES
   */
  const [postContent, setPostContent] = useState<PostContent[]>([])
  const [loadingContents, setLoadingContents] = useState<boolean>(false)

  /**
   * REDUX HOOKS
   */
  const { list: categories, selected: selectedCategory } = useSelector(
    (state: RootState) => state.category
  )
  const { filtered: tags, selected: selectedTag } = useSelector(
    (state: RootState) => state.tag
  )
  const posts = useSelector((state: RootState) => state.post.filtered)
  const dispatch = useDispatch()

  /**
   * USEEFFECTS
   */
  useEffect(() => {
    if (categories.length && !selectedCategory)
      dispatch(setSelectedCategory(categories[0]))
  }, [categories, selectedCategory, dispatch])

  useEffect(() => {
    if (!selectedCategory) return
    dispatch(selectTagsByCategory(selectedCategory.id))
  }, [selectedCategory])

  useEffect(() => {
    if (tags.length && !selectedTag) dispatch(setSelectedTag(tags[0]))
  }, [tags, selectedTag, dispatch])

  useEffect(() => {
    if (!selectedTag || !selectedCategory) return
    dispatch(
      selectPostsByTagAndCategory({
        tagId: selectedTag.id,
        categoryId: selectedCategory.id,
      })
    )
  }, [selectedTag, selectedCategory])

  useEffect(() => {
    if (!posts.length) return
    setLoadingContents(true)
    const fetchContent = async () => {
      const tmp: PostContent[] = []
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i]
        const contents = await UxComicService.getContent(post.id)
        tmp.push({ id: post.id, contents })
      }
      setPostContent(tmp)
      setLoadingContents(false)
    }
    fetchContent()
  }, [posts])

  /**
   * HANDLERS
   */
  const handleLoadTags = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(
      setSelectedCategory(
        categories.find((category) => category.id === event.currentTarget.id) ||
          undefined
      )
    )
    dispatch(selectTagsByCategory(event.currentTarget.id))
    dispatch(setSelectedTag(undefined))
  }

  const handleLoadPosts = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!selectedCategory) return
    dispatch(
      setSelectedTag(
        tags.find((tag) => tag.id === event.currentTarget.id) || undefined
      )
    )
  }

  return (
    <Layout>
      {/** CATEGORY SECTION */}
      <div className="flex flex-nowrap space-x-5">
        {categories.map((category) => (
          <div
            key={category.id}
            id={category.id}
            className="flex place-items-center"
            onClick={handleLoadTags}
          >
            <img src={category.iconUrl} alt={category.title} className="w-11" />
            <h1>{category.title}</h1>
          </div>
        ))}
      </div>

      {/** TAG SECTION */}
      <div className="flex flex-nowrap space-x-5">
        {tags.map((tag) => (
          <button key={tag.id} id={tag.id} onClick={handleLoadPosts}>
            {tag.name}
          </button>
        ))}
      </div>

      {/** POST SECTION */}
      <div className="flex flex-grow items-center justify-center">
        {!loadingContents && (
          <PostSection posts={posts} postContent={postContent} />
        )}
        {loadingContents && <p>Loading...</p>}
      </div>
    </Layout>
  )
}

export const Head: HeadFC = ({ location, params, data, pageContext }) => {
  console.log(location, params, data, pageContext)
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
