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
    case 'heading_1':
      data = block?.heading_1?.rich_text[0]?.plain_text
      break
    case 'heading_2':
      data = block?.heading_2?.rich_text[0]?.plain_text
      break
    case 'heading_3':
      data = block?.heading_3?.rich_text[0]?.plain_text
      break
    case 'paragraph':
      data = block?.paragraph?.rich_text[0]?.plain_text
      break
    case 'image':
      data = block?.image?.file?.url
      break
    case 'bulleted_list_item':
      data = block?.bulleted_list_item?.rich_text[0]?.plain_text
      break
    case 'numbered_list_item':
      data = block?.numbered_list_item?.rich_text[0]?.plain_text
      break
    case 'divider':
      break
    case 'callout':
      data = {
        title: block?.callout?.rich_text[0]?.plain_text,
        icon: block?.callout?.icon?.emoji,
        items: [],
      }
  }
  return data
}

module.exports = {
  getContentData,
}
