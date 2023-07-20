import axios from "axios";

const API_KEY = '36867238-d18d023007d9afe06dc91b3fb';
const BASE_URL = 'https://pixabay.com/api/';

function getImages(query, page) {
   return axios
        .get(
            `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
}

export default getImages;