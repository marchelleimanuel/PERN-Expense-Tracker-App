import axios from "axios"
import { BASE_URL, HOME_GET_AMOUNT_URL } from "../../routes/urlPath"

export const getAmount = async (id_user) => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + HOME_GET_AMOUNT_URL,
        params: {
            id_user: id_user
        }
    })

    const {data} = response;
    return data;
}