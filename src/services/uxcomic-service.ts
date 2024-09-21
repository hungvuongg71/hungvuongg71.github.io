import axios from 'axios'

export interface Category {
  id: string
  title: string
  iconUrl?: string
}

export interface Tag {
  id: string
  name: string
  databaseId: string
}

export interface Post {
  id: string
  title: string
  cover: string
  categoryId: string
  tagId: string
}

export interface Content {
  id: string
  type: 'paragraph' | 'image' | 'bulleted_list_item'
  data: string
}

export const UxComicService = {
  async getCategories(): Promise<Category[]> {
    try {
      const {
        data: { data },
      } = await axios.get('/.netlify/functions/categories')
      return data
    } catch (error) {
      throw error
    }
  },
  async getCategoryTags(id: string): Promise<Tag[]> {
    try {
      const {
        data: { data },
      } = await axios.get(`/.netlify/functions/category-tags?id=${id}`)
      return data
    } catch (error) {
      throw error
    }
  },
  async getPosts(databaseId: string, tagName: string): Promise<Post[]> {
    try {
      const {
        data: { data },
      } = await axios.get(
        `/.netlify/functions/posts?databaseId=${databaseId}&tagName=${tagName}`
      )
      return data
    } catch (error) {
      throw error
    }
  },
  async getContent(blockId: string): Promise<Content[]> {
    try {
      const {
        data: { data },
      } = await axios.get(`/.netlify/functions/content?blockId=${blockId}`)
      return data
    } catch (error) {
      throw error
    }
  },
}
