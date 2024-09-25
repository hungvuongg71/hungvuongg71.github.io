const path = require('path')
const notion = require('./netlify/helpers/notion-sdk-helper')

/**
 * GATSBY CREATE NODES
 * @param {*} param0
 */
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  let notionPosts = []
  const categories = await getCategories()

  for (let i = 0; i < categories.length; i++) {
    let tmpPost = {}
    const category = categories[i]
    tmpPost.category = category
    const tags = await getTags(category.id)
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j]
      tmpPost.tag = tag
      let posts = await getPosts(tag.databaseId, tag.name, tag.id, category.id)
      posts = posts
        .filter((post) => !!post?.id)
        .map((post) => ({ ...post, ...tmpPost }))
      notionPosts.push(...posts)
    }
  }

  // Node Posts
  notionPosts.forEach((post) => {
    // Tạo node cho mỗi bài viết
    createNode({
      id: createNodeId(`NotionPost-${post.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'NotionPost', // Tên node
        contentDigest: createContentDigest(post),
      },
      // Dữ liệu được lưu vào GraphQL
      post,
      // Bạn có thể lưu thêm nhiều field từ Notion tại đây
    })
  })
}

/**
 * GATSBY CREATE PAGES
 * @param {*} param0
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
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
  if (result.errors) throw result.errors
  let notionPosts = result.data.allNotionPost.nodes
  console.log('notionPosts', JSON.stringify(notionPosts))

  notionPosts.forEach(({ post }) => {
    createPage({
      path: `/post/${post.id}`,
      component: path.resolve(`./src/templates/post-template.tsx`),
      context: {
        id: post.id,
        title: post.title,
        cover: post.cover,
        tagId: post.tagId,
        categoryId: post.categoryId,
      },
    })
  })
}

const getCategories = async () => {
  try {
    const rootBlockChildren = await notion.blocks.children.list({
      block_id: process.env.ROOT_PAGE_ID,
    })
    const database =
      rootBlockChildren.results[
        rootBlockChildren.results.findIndex(
          (block) => block.type == 'child_database'
        )
      ] || null
    const categoriesResponse = await notion.databases.query({
      database_id: database.id,
      sorts: [
        {
          property: 'Name',
          direction: 'ascending',
        },
      ],
    })

    const data = categoriesResponse.results
      .filter((item) => item.properties.Publish?.checkbox)
      .map((item) => ({
        id: item.id,
        title: item.properties?.Name?.title[0].plain_text,
        iconUrl: item.icon?.file?.url,
      }))

    return data
  } catch (error) {
    console.error('Notion API Error:', error.message)
    console.log('Context info:', JSON.stringify(context))

    return []
  }
}

const getTags = async (blockId) => {
  try {
    if (!blockId) return []
    const blockChildren = await notion.blocks.children.list({
      block_id: blockId,
    })
    const database =
      blockChildren.results[
        blockChildren.results?.findIndex(
          (block) => block.type == 'child_database'
        )
      ] || null
    const queryResponse = await notion.databases.query({
      database_id: database.id,
      sorts: [
        {
          property: 'Name',
          direction: 'ascending',
        },
      ],
    })
    const tags = queryResponse.results
      .map((item) => {
        return {
          id: item.properties?.Tag?.select?.id,
          name: item.properties?.Tag?.select?.name,
          databaseId: database.id,
          categoryId: blockId,
        }
      })
      .filter((item) => item?.id !== undefined)
      .filter(
        (item, index, self) =>
          index === self?.findIndex((t) => t.name === item.name)
      )
    return tags
  } catch (error) {
    console.error('Notion API Error:', error.message)
    console.log('Context info:', JSON.stringify(context))
    return []
  }
}

const getPosts = async (databaseId, tagName, tagId, categoryId) => {
  try {
    if (!databaseId || !tagName) return []

    const queryResponse = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          // {
          //   property: 'Publish',
          //   checkbox: {
          //     equals: true,
          //   },
          // },
          {
            property: 'Tag',
            select: {
              equals: tagName,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Created time',
          direction: 'descending',
        },
      ],
    })
    const posts = queryResponse.results.map((item) => ({
      id: item.id,
      title: item.properties?.Name?.title[0]?.plain_text,
      publish: item.properties?.Publish?.checkbox,
      cover: item.cover?.file?.url,
      tagId,
      categoryId,
    }))

    return posts
  } catch (error) {
    console.error('Notion API Error:', error.message)
    console.log('Context info:', JSON.stringify(context))

    return []
  }
}
