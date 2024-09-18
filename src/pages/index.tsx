import React, { useState, useEffect } from 'react'
import { Link, type HeadFC, type PageProps } from 'gatsby'
import Layout from '../components/layout'
import {
  Category,
  Post,
  Tag,
  UxComicService,
} from '../services/uxcomic-service'
import { UxComicButton, UxComicCard, UxComicDialog } from '../components/common'
import TagsSection from '../components/tags-section'

interface IIndexPageProps extends PageProps {
  pageTitle: string
}

interface TagList {
  id: string
  tags: Tag[]
}

const IndexPage: React.FC<React.PropsWithChildren<IIndexPageProps>> = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [tagList, setTagList] = useState<TagList[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<Post[]>([])

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

  useEffect(() => {
    if (!tags || !openDialog) return
    const { databaseId, name } = tags[0]
    UxComicService.getPosts(databaseId, name).then((data) => setPosts(data))
  }, [openDialog])

  const handleGoToSubCategories = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (loading) return
    const tmpTags =
      tagList.find((item) => item.id === event.currentTarget.id)?.tags || []
    setTags(tmpTags)
    setOpenDialog(true)
  }

  const handleLoadPostsByCategory = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const tag = tags.filter((tag) => tag.id === event.currentTarget.id)[0]
    if (!tag) alert('invalid tag')
    const { databaseId, name } = tag
    UxComicService.getPosts(databaseId, name).then((data) => setPosts(data))
  }

  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <Link to="/about">Go to About Me</Link>
      {loading && <p>Loading...</p>}
      <div className="grid gap-3 grid-cols-3">
        {categories?.map((category) => (
          <UxComicCard
            key={category.id}
            id={category.id}
            onClick={handleGoToSubCategories}
          >
            <img src={category.iconUrl} alt={category.title} />
            {category.title}
          </UxComicCard>
        ))}
      </div>
      <UxComicDialog open={openDialog} setOpen={setOpenDialog}>
        <>
          <TagsSection
            tags={tags}
            onButtonClick={handleLoadPostsByCategory}
          ></TagsSection>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </>
      </UxComicDialog>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
