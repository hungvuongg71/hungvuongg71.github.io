require('dotenv').config()
const notion = require('../helpers/notion-sdk-helper')
const {
  successResponse,
  errorResponse,
  badRequestResponse,
} = require('../helpers/response-helper')

exports.handler = async function (event, context) {
  try {
    const { databaseId, tagName } = event.queryStringParameters
    if (!databaseId || !tagName)
      return badRequestResponse('invalid database id or tag name')
    // const blockChildren = await notion.blocks.children.list({ block_id: id })
    // const database =
    //   blockChildren.results[
    //     blockChildren.results?.findIndex(
    //       (block) => block.type == 'child_database'
    //     )
    //   ] || null
    // if (!database) return badRequestResponse('invalid fetch data')
    const queryResponse = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Tag',
        select: {
          equals: tagName,
        },
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
    }))
    return successResponse(posts)
  } catch (error) {
    console.error('Notion API Error:', error.message)
    console.log('Context info:', context)
    return errorResponse()
  }
}
