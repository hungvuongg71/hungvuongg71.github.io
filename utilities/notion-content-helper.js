/**
 *
 * @param {import('@notionhq/client/build/src/api-endpoints').ListBlockChildrenResponse} queryResponse
 * @returns
 */
const getContentData = (queryResponse) => {
  let content = []
  content = queryResponse.results.map((block) => {
    let cnt = {}
    cnt.id = block.id
    cnt.type = block.type
    cnt.data = getDataValue(block)
    return cnt
  })
  return content
}

/**
 *
 * @param {import('@notionhq/client/build/src/api-endpoints').PartialBlockObjectResponse | import('@notionhq/client/build/src/api-endpoints').BlockObjectResponse} block
 */
const getDataValue = (block) => {
  try {
    let data = { value: '' }
    switch (block?.type) {
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
      case 'paragraph':
      case 'bulleted_list_item':
      case 'numbered_list_item':
        data.value = block[block.type]?.rich_text[0]?.plain_text || ''
        break
      case 'image':
        data.value = block?.image?.file?.url || ''
        break
      case 'divider':
        break
      case 'callout':
        data.value = JSON.stringify({
          title: block?.callout?.rich_text[0]?.plain_text,
          icon: block?.callout?.icon?.emoji,
          items: [],
        })
        break
    }
    return data
  } catch (error) {
    console.error(`[getDataValue] Exception : ${error}`)
  }
}

module.exports = {
  getContentData,
}
