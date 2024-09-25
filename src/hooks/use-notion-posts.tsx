import { graphql, useStaticQuery } from 'gatsby'
import { NotionPost } from '../uxcomic-types'

interface NotionPostsQueryData {
  allNotionPost: {
    nodes: NotionPost[]
  }
}

export const useNotionPosts = () => {
  const data = useStaticQuery<NotionPostsQueryData>(graphql`
    query {
      allNotionPost {
        nodes {
          post {
            id
            title
            publish
            cover
            category {
              id
              title
              iconUrl
            }
            tag {
              id
              name
              databaseId
              categoryId
            }
          }
        }
      }
    }
  `)

  return data.allNotionPost.nodes
}
