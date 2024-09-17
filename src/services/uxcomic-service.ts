import axios from 'axios'

interface Category {
    id: string;
    title: string;
}

export const UxComicService = {
    async getCategories(): Promise<Category[]> {
        try {
            const { data } = await axios.get('/.netlify/functions/categories')
            return data.data
        } catch (error) {
            throw error
        }
    }
}