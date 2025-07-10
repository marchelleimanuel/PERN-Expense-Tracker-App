import axios from "axios";
import { BASE_URL, GET_DAY, GET_MONTH, GET_YEAR } from "../../routes/urlPath";

export const getYear = async () => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + GET_YEAR
    });

    const { data } = response;
    return data;
}

export const getMonth = async () => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + GET_MONTH
    });

    const { data } = response;
    return data;
}

export const getDay = async () => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + GET_DAY
    });

    const { data } = response;
    return data;
}