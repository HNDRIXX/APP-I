import axios from "axios";

const API_URL = 'https://moviesdatabase.p.rapidapi.com/titles/series/{seriesId}'
export const useMovie = async (currentPage) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://moviesdatabase.p.rapidapi.com/titles',
            params: {
                startYear: '2013',
                list: 'top_rated_english_250',
                // limit: 10,
                sort: 'year.decr',
                page: currentPage.toString()
            },
            headers: {
                'X-RapidAPI-Key': '5a2c8239camsh0eddcc15d79e3cap157612jsn64d8aa40f7a1',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            },
        }

        const response = await axios.request(options);
	    // console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}