export interface Category {
  id: string
  title: string
  icon: string
}

export interface Tag {
  id: string
  name: string
  databaseId: string
  categoryId: string
}

export interface Post {
  id: string
  title: string
  cover: string
  tagId: string
  categoryId: string
  content?: Content[]
}

export interface Content {
  id: string
  type:
    | 'heading_1'
    | 'heading_2'
    | 'heading_3'
    | 'callout'
    | 'paragraph'
    | 'image'
    | 'bulleted_list_item'
    | 'numbered_list_item'
    | 'callout'
    | 'divider'
  data: ContentData
}

export interface ContentData {
  value: string
}

export interface Callout {
  title: string
  icon: string
  items: Content[]
}

export interface NotionPostQuery {
  post: {
    id: string
    title: string
    publish: boolean
    cover: string
    category: Category
    tag: Tag
    content?: Content[]
  }
}
