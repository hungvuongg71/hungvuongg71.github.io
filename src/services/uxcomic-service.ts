import axios from 'axios'

export const UxComicService = {
    getCategories: async () => {
        const { data } = await axios.get('/api/uxcomic/categories')
        return data
    }
}