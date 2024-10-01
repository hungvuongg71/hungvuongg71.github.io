export interface Category {
  id: string
  title: string
  iconUrl?: string
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
}

export interface PostContent {
  id: string
  contents: Content[]
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
  data: string | NotionCallout | undefined
}

export interface NotionPost {
  post: {
    id: string
    title: string
    publish: boolean
    cover: string
    category: Category
    tag: Tag
  }
}

export interface NotionCallout {
  title: string
  icon: string
  items: Content[]
}
