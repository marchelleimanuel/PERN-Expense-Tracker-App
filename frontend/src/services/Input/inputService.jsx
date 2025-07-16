import axios from "axios";
import { BASE_URL, INPUT_GET_CATEGORY_URL, INPUT_GET_RECENT_TRANSACTION_URL, INPUT_POST_TRANSACTION_URL } from "../../routes/urlPath";

export const getCategory = async (type) => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + INPUT_GET_CATEGORY_URL + `-${type.toLowerCase()}`
    })

    const { data } = response;
    return data;
} 

export const postTransaction = async (input) => {

    const response = await axios({
        method: 'post',
        url: BASE_URL + INPUT_POST_TRANSACTION_URL,
        data: {
            type: input.type,
            category: input.category,
            amount: input.amount,
            date: input.date,
            notes: input.notes ? input.notes : '',
            id_user: input.id_user ? input.id_user : ''
        }
    })

    const { data } = response;
    return data;
}

export const getRecentTransaction = async (id_user) => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + INPUT_GET_RECENT_TRANSACTION_URL,
        params: {
            id_user: id_user
        }
    })

    const { data } = response;
    return response; 
}