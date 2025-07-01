import axios from "axios";
import { BASE_URL, REPORT_DELETE_DATA_URL, REPORT_GET_ALL_DATA_URL } from "../../routes/urlPath";

export const getAllReport = async (id_user) => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + REPORT_GET_ALL_DATA_URL,
        params: {
            id_user: id_user
        }
    });

    const { data } = response;
    return data;
}

export const deleteReport = async (id_transaction) => {
    const response = await axios({
        method: 'delete',
        url: BASE_URL + REPORT_DELETE_DATA_URL,
        data: {
            id_transaction: id_transaction
        }
    });

    const { data } = response;
    return data;
}
