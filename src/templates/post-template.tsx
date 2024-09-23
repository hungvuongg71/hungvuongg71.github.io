import { HeadFC, navigate, PageProps } from 'gatsby'
import React, { useEffect } from 'react'
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
  const { title, tagId, id, cover, categoryId } = pageContext as PageContext

  useEffect(() => {
    setTimeout(redirectToPostDetail, 2000)
  }, [])

  const redirectToPostDetail = () => {
    navigate(`/?postId=${id}&tagId=${tagId}&categoryId=${categoryId}`)
  }

  return (
    <div>
      <h1>Loading...</h1>
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
        content={`${process.env.GATSBY_WEB_ROOT_URL}/post/${id}`}
      />
    </>
  )
}

export default PostTemplate
