const path = require('path')
const notion = require('./netlify/helpers/notion-sdk-helper')

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  let notionPosts = []
  const categories = await getCategories()
  // categories.forEach(async (category) => {
  //   let categoryTags = await getCategoryTags(category.id)

  // })

  const selectedCategory = categories.find(
    (category) => category.id === '5cacdbff-b9e2-4973-b565-ec1ae4327ec9'
  )

  const categoryTags = await getCategoryTags(selectedCategory.id)
  const selectCategoryTag = categoryTags.find(
    (tag) => tag.id === '843ac5bc-2826-43e2-a5ea-ff89ae43d888'
  )
  const posts = await getPosts(
    selectCategoryTag.databaseId,
    selectCategoryTag.name,
    selectCategoryTag.id,
    selectedCategory.id
  )

  posts.forEach((post) => {
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
