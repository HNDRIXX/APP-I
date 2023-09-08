import axios from "axios";

const DICTIONARY_API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'

export const getDictionary = async ( wordInput ) => {
    try {
        const response = await axios.get(`${DICTIONARY_API_BASE_URL}/${wordInput}`)
        // console.log(response.data)
        
        return response.data
    } catch (error) {
        console.log('Error fetching word definition', error)
        throw error
    }
}