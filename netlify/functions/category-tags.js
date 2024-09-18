const notion = require('../helpers/notion-sdk-helper')
const {
  successResponse,
  errorResponse,
  badRequestResponse,
} = require('../helpers/response-helper')

exports.handler = async function (event, context) {
  try {
    const { id } = event.queryStringParameters
    if (!id) return badRequestResponse('invalid id')
    const blockChildren = await notion.blocks.children.list({ block_id: id })
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
    return successResponse(categoryTags)
  } catch (error) {
    console.error('Notion API Error:', error.message)
    console.log('Context info:', context)
    return errorResponse()
  }
}
