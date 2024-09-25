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
  type: 'paragraph' | 'image' | 'bulleted_list_item'
  data: string
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
