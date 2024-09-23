const path = require('path')
const notion = require('./netlify/helpers/notion-sdk-helper')

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  let notionPosts = []
  const categories = await getCategories()

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    const categoryTags = await getCategoryTags(category.id)
    for (let j = 0; j < categoryTags.length; j++) {
      const categoryTag = categoryTags[i]
      const posts = await getPosts(
        categoryTag.databaseId,
        categoryTag.name,
        categoryTag.id,
        category.id
      )

      if (posts.length) notionPosts.push(...posts)
    }
  }

  notionPosts.forEach((post) => {
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

const getCategoryTags = async (blockId) => {
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
    const categoryTags = queryResponse.results
      .map((item) => {
        return {
          id: item.properties?.Tag?.select?.id,
          name: item.properties?.Tag?.select?.name,
          databaseId: database.id,
        }
      })
      .filter((item) => item?.id !== undefined)
      .filter(
        (item, index, self) =>
          index === self?.findIndex((t) => t.name === item.name)
      )
    return categoryTags
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
          {
            property: 'Publish',
            checkbox: {
              equals: true,
            },
          },
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
