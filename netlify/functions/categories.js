require('dotenv').config()
const notion = require('../helpers/notion-sdk-helper')
const { successResponse, errorResponse } = require('../helpers/response-helper')

exports.handler = async function (event, context) {
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

    return successResponse(data)
  } catch (error) {
    console.error('Notion API Error:', error.message)
    console.log('Context info:', JSON.stringify(context))
    return errorResponse()
  }
}
