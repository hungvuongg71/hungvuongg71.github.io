import React, { useState, useEffect } from 'react'
import { Link, type HeadFC, type PageProps } from 'gatsby'
import Layout from '../components/layout'
import { Category, Tag, UxComicService } from '../services/uxcomic-service'
import { UxComicCard, UxComicDialog } from '../components/common'
import { Button } from '@headlessui/react'

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

  const handleGoToSubCategories = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const tmpTags =
      tagList.find((item) => item.id === event.currentTarget.id)?.tags || []
    setTags(tmpTags)
    setOpenDialog(true)
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
        {tags.map((tag) => (
          <Button key={tag.id}>{tag.name}</Button>
        ))}
      </UxComicDialog>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
