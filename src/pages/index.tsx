import React, { useState, useEffect } from 'react'
import { Link, type HeadFC, type PageProps } from 'gatsby'
import Layout from '../components/layout'
import {
  Category,
  Content,
  Post,
  Tag,
  UxComicService,
} from '../services/uxcomic-service'
import { UxComicCard } from '../components/common'
import TagsSection from '../components/tags-section'
import PostsSection from '../components/posts-section'
import { useLocation } from '@reach/router'
import { Helmet } from 'react-helmet'

interface IIndexPageProps extends PageProps {
  pageTitle: string
}

interface ServerData {
  title: string
  imageUrl: string
  postId: string
  tagId: string
  categoryId: string
}

interface TagList {
  id: string
  tags: Tag[]
}

export interface ContentList {
  id: string
  contents: Content[]
}

const IndexPage: React.FC<React.PropsWithChildren<IIndexPageProps>> = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [tagList, setTagList] = useState<TagList[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false)
  const [selectedTag, setSelectedTag] = useState<Tag>()
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [contentList, setContentList] = useState<ContentList[]>([])

  const location = useLocation()

  useEffect(() => {
    try {
      setLoading(true)
      UxComicService.getCategories().then(async (data) => {
        setCategories(data)
        let tmpTagList: TagList[] = []
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          const tags = await UxComicService.getCategoryTags(item.id)
          tmpTagList.push({ id: item.id, tags: tags })
        }
        setTagList(tmpTagList)
        setLoading(false)
      })
    } catch (error: any) {
      alert(error.message)
    }
  }, [])

  // useEffect(() => {
  //   // console.log(categories, selectedCategory, tagList)
  //   if (!categories.length || selectedCategory || !tagList.length) return
  //   setSelectedCategory(categories[0])
  //   if (selectedCategory === undefined) return
  //   // const tmpTags =
  //   //   tagList.find((item) => item.id === selectedCategory?.id)?.tags || []
  //   // setTags(tmpTags)
  // }, [categories, selectedCategory, tagList])

  useEffect(() => {
    if (!location || !tagList.length) return
    const categoryId = new URLSearchParams(location.search).get('categoryId')
    if (!categoryId || loading) return
    const tmpTags = tagList.find((item) => item.id === categoryId)?.tags || []
    if (!tmpTags.length) {
      console.log('Not Found Tags')
      return
    }
    setTags(tmpTags)
  }, [location, tagList])

  useEffect(() => {
    if (!location || !tags.length) return
    const tagId = new URLSearchParams(location.search).get('tagId')
    if (!tagId) return
    const tag = tags.find((tag) => tag.id === tagId)
    if (!tag) {
      console.log('Not found tag')
      return
    }
    loadPost(tag)
  }, [location, tags])

  const loadPost = (tag: Tag) => {
    if (selectedTag?.id === tag.id) return
    setLoadingPosts(true)
    setSelectedTag(tag)
    const { databaseId, name } = tag
    UxComicService.getPosts(databaseId, name)
      .then(async (data) => {
        data.forEach((item) => {
          // item.cover = item?.cover || process.env.DEFAULT_THUMBNAIL || ''
          item.cover =
            'https://searchengineland.com/wp-content/seloads/2016/01/smx-london-home-skyline-1200x630.png'
          item.tagId = tag.id
          item.categoryId = selectedCategory?.id || ''
        })
        setPosts(data)
        return data
      })
      .then((data) => loadContentList(data).then(() => setLoadingPosts(false)))
  }

  const loadContentList = async (postData: Post[]) => {
    const tmpContentList: ContentList[] = []
    for (let i = 0; i < postData.length; i++) {
      const post = postData[i]
      const content = await UxComicService.getContent(post.id)
      tmpContentList.push({ id: post.id, contents: content })
    }
    setContentList(tmpContentList)
  }

  const handleGoToSubCategories = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (loading) return
    const tmpTags =
      tagList.find((item) => item.id === event.currentTarget.id)?.tags || []
    setTags(tmpTags)
    setSelectedCategory(
      categories.find((category) => category.id === event.currentTarget.id)
    )
  }

  const handleLoadPostsByCategory = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (loadingPosts) return
    const tag = tags.filter((tag) => tag.id === event.currentTarget.id)[0]
    if (!tag) {
      console.log('invalid tag')
      return
    }
    loadPost(tag)
  }

  return (
    <Layout pageTitle="Home Page">
      <Link to="/about">Go to About Me</Link>
      {!loading && (
        <div className="flex flex-nowrap">
          {categories?.map((category) => (
            <UxComicCard
              key={category.id}
              id={category.id}
              onClick={handleGoToSubCategories}
            >
              {category.iconUrl && (
                <img src={category.iconUrl} alt={category.title} />
              )}
              {category.title}
            </UxComicCard>
          ))}
        </div>
      )}
      {loading && <p>Loading...</p>}
      <TagsSection
        tags={tags}
        onButtonClick={handleLoadPostsByCategory}
      ></TagsSection>
      {!loadingPosts && (
        <PostsSection posts={posts} contentList={contentList}></PostsSection>
      )}
      {loadingPosts && <p>Loading...</p>}
    </Layout>
  )
}

export default IndexPage

// export const Head: HeadFC = ({ serverData }) => {
//   const { title, tagId, postId, imageUrl, categoryId } =
//     serverData as ServerData

//   return (
//     <>
//       <title>{title || 'Home Page'}</title>
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={title} />
//       <meta property="og:image" content={imageUrl} />
//       <meta property="og:type" content="article" />
//       <meta
//         property="og:url"
//         content={`https://deploy-preview-2--hungvuongg71.netlify.app/?postId=${postId}&tagId=${tagId}&categoryId=${categoryId}&title=${title}&imageUrl=${imageUrl}`}
//       />
//     </>
//   )
// }

// export const getServerData = (context: any) => {
//   console.log(context)
//   return {
//     props: {
//       ...context.query,
//     },
//   }
// }
