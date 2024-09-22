import { HeadFC, PageProps } from 'gatsby'
import React from 'react'
import { Post } from '../services/uxcomic-service'
import { json } from 'stream/consumers'

interface IPostProps extends PageProps {}

interface PageContext {
  id: string
  title: string
  cover: string
  tagId: string
  categoryId: string
}

const PostTemplate: React.FC<React.PropsWithChildren<IPostProps>> = ({
  pageContext,
}) => {
  return (
    <div>
      <h1>{JSON.stringify(pageContext)}</h1>
    </div>
  )
}

export const Head: HeadFC = ({ pageContext }) => {
  const { title, tagId, id, cover, categoryId } = pageContext as PageContext

  return (
    <>
      <title>{title || 'Home Page'}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={title} />
      <meta property="og:image" content={cover} />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={`https://deploy-preview-2--hungvuongg71.netlify.app/post/${id}`}
      />
    </>
  )
}

export default PostTemplate
