import axios from 'axios'

export const UxComicService = {
    getCategories: async () => {
        const { data } = await axios.get('/.netlify/functions/categories')
        return data
    }
}