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
}

export const UxComicService = {
  async getCategories(): Promise<Category[]> {
    try {
      const { data } = await axios.get('/.netlify/functions/categories')
      return data.data
    } catch (error) {
      throw error
    }
  },
  async getCategoryTags(id: string): Promise<Tag[]> {
    try {
      const { data } = await axios.get(
        `/.netlify/functions/category-tags?id=${id}`
      )
      return data.data
    } catch (error) {
      throw error
    }
  },
  async getPosts(databaseId: string, tagName: string): Promise<Post[]> {
    try {
      const { data } = await axios.get(
        `/.netlify/functions/posts?databaseId=${databaseId}&tagName=${tagName}`
      )
      return data.data
    } catch (error) {
      throw error
    }
  },
}
