/**
 *
 * @param {import('@notionhq/client/build/src/api-endpoints').ListBlockChildrenResponse} queryResponse
 * @returns
 */
const getContentData = (queryResponse) => {
  let content = []
  content = queryResponse.results.map((block) => {
    let result = {}
    result.id = block.id
    result.type = block.type
    result.data = getDataValue(block)
    return result
  })
  return content
}

/**
 *
 * @param {import('@notionhq/client/build/src/api-endpoints').PartialBlockObjectResponse | import('@notionhq/client/build/src/api-endpoints').BlockObjectResponse} block
 */
const getDataValue = (block) => {
  let data = null
  switch (block?.type) {
    case 'paragraph':
      data = block?.paragraph?.rich_text[0]?.plain_text
      break
    case 'image':
      data = block?.image?.file?.url
      break
    case 'bulleted_list_item':
      data = block?.bulleted_list_item?.rich_text[0]?.plain_text
      break
  }
  return data
}

module.exports = {
  getContentData,
}
