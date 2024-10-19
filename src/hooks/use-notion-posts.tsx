import { graphql, useStaticQuery } from 'gatsby'
import { NotionPostQuery } from '../uxcomic-types'

interface NotionPostsQueryData {
  allNotionPost: {
    nodes: NotionPostQuery[]
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
              icon
            }
            tag {
              id
              name
              databaseId
              categoryId
            }
            content {
              id
              type
              data {
                value
              }
            }
          }
        }
      }
    }
  `)

  return data.allNotionPost.nodes
}
