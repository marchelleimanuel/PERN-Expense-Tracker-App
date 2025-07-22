import axios from "axios";
import { BASE_URL, REPORT_DELETE_DATA_URL, REPORT_EDIT_DATA_URL, REPORT_GET_ALL_DATA_URL } from "../../routes/urlPath";

export const getAllReport = async (id_user, filter) => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + REPORT_GET_ALL_DATA_URL,
        params: {
            id_user: id_user,
            years: filter.years ? filter.years : '',
            months: filter.months ? filter.months : '',
            type: filter.type ? filter.type : ''
        }
    });

    const { data } = response;
    return data;
}

export const deleteReport = async (id_transaction, type) => {
    const response = await axios({
        method: 'delete',
        url: BASE_URL + REPORT_DELETE_DATA_URL,
        data: {
            id_transaction: id_transaction,
            type: type
        }
    });

    const { data } = response;
    return data;
}

export const editReport = async (input) => {
    const response = await axios({
        method: 'patch',
        url: BASE_URL + REPORT_EDIT_DATA_URL,
        data: {
            category: input.category,
            amount: input.amount,
            date: input.date,
            notes: input.notes ,
            id_user: input.id_user,
            id_transaction: input.id_transaction,
            type: input.type
        }
    });

    const { data } = response;
    return data;
}
