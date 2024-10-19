const path = require('path')
const notion = require('./utilities/notion-sdk-helper')
const contentHelper = require('./utilities/notion-content-helper')

/**
 * GATSBY CREATE NODES
 * @param {*} param0
 */
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createTypes } = actions

  createTypes(`
    type NotionCategory {
      id: String
      title: String
      icon: String
    }

    type NotionTag {
      id: String
      name: String
      databaseId: String
      categoryId: String
    }

    type NotionData {
      value: String
    }

    type NotionContent {
      id: String
      type: String
      data: NotionData
    }

    type NotionPostBase {
      id: String
      title: String
      publish: String
      cover: String
      tag: NotionTag
      category: NotionCategory
      content: [NotionContent]
    }

    type NotionPost implements Node @dontInfer {
      post: NotionPostBase
    }
  `)

  let notionPosts = []

  // Get Categories
  const categories = await getCategories()
  for (let i = 0; i < categories.length; i++) {
    let tmpPost = {}
    const category = categories[i]
    tmpPost.category = category

    // Get Tags
    const tags = await getTags(category.id)
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j]
      tmpPost.tag = tag

      // Get Posts
      let posts = await getPosts(tag.databaseId, tag.name, tag.id, category.id)
      for (let k = 0; k < posts.length; k++) {
        const post = posts[k]
        tmpPost.content = await getContent(post.id)
        tmpPost.cover = process.env.GATSBY_THUMBNAIL_DEFAULT

        if (!tmpPost.content?.length) continue

        // Get CallOut Items
        for (let u = 0; u < tmpPost.content.length; u++) {
          let cnt = tmpPost.content[u]
          if (cnt.type === 'callout') {
            let tmpData = JSON.parse(cnt.data.value)
            tmpData.items = await getContent(cnt.id)
            cnt.data.value = JSON.stringify(tmpData)
          }
        }

        // Set Post Cover By First Image of Content
        const firstImg = tmpPost.content.find((cnt) => cnt.type === 'image')
        if (firstImg) {
          tmpPost.cover = firstImg.data.value // Get first image in content
          tmpPost.content = tmpPost.content.filter(
            (cnt) => cnt.id !== firstImg.id
          ) // Remove first image because of cover post
        }
      }

      posts = posts
        .filter((post) => !!post?.id)
        .map((post) => ({ ...post, ...tmpPost }))

      notionPosts.push(...posts)
    }
  }

  // Node Posts
  notionPosts.forEach((post) => {
    // Create node each post
    createNode({
      id: createNodeId(`NotionPost-${post.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'NotionPost', // Node name
        contentDigest: createContentDigest(post),
      },
      // Save into GraphQL
      post,
      // More properties from Notion API
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

  if (result.errors) throw result.errors

  let notionPosts = result.data.allNotionPost.nodes

  notionPosts.forEach(({ post }) => {
    createPage({
      path: `/post/${post.id}`,
      component: path.resolve(`./src/templates/post-template.tsx`),
      context: {
        id: post.id,
        title: post.title,
        cover: post.cover,
        tagId: post.tag.id,
        categoryId: post.category.id,
      },
    })
  })
}

/**
 * PRIVATE FUNCTIONS
 */
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
        icon: item.icon?.emoji,
      }))

    return data
  } catch (error) {
    console.error('[getCategories] Notion API Error:', JSON.stringify(error))

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
    console.error('[getTags] Notion API Error:', error.message)

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
    }))

    return posts
  } catch (error) {
    console.error('[getPosts] Notion API Error:', error.message)

    return []
  }
}

const getContent = async (blockId) => {
  try {
    if (!blockId) return []

    const queryResponse = await notion.blocks.children.list({
      block_id: blockId,
    })

    const content = contentHelper.getContentData(queryResponse)

    return content
  } catch (error) {
    console.error('[getContent] Notion API Error:', JSON.stringify(error))

    return []
  }
}
