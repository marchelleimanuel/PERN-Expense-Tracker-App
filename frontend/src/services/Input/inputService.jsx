import axios from "axios";
import { BASE_URL, INPUT_GET_CATEGORY_URL } from "../../routes/urlPath";

export const getCategory = async () => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + INPUT_GET_CATEGORY_URL
    })

    const { data } = response;
    return data;
} 