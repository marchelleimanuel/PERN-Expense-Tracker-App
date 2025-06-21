import axios from "axios";
import { BASE_URL, INPUT_GET_CATEGORY_URL, INPUT_POST_TRANSACTION_URL } from "../../routes/urlPath";

export const getCategory = async () => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + INPUT_GET_CATEGORY_URL
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
            notes: input.notes ? input.notes : ''
        }
    })

    const { data } = response;
    return data;
}