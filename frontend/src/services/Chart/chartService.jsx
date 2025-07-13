import axios from "axios"
import { BAR_CHART_GET_TOTAL_EXPENSE_AND_INCOME, BASE_URL, PIE_CHART_GET_EXPENSE_PER_CATEGORY, PIE_CHART_GET_INCOME_PER_CATEGORY } from "../../routes/urlPath";

export const GetTotalExpenseAndIncome = async (id_user, filter) => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + BAR_CHART_GET_TOTAL_EXPENSE_AND_INCOME,
        params: {
            id_user: id_user,
            year: filter.year ? filter.year : '',
            month: filter.month ? filter.month : ''
        }
    });

    const { data } = response;
    return data;
}

export const GetExpensePerCategory = async (id_user, filter) => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + PIE_CHART_GET_EXPENSE_PER_CATEGORY,
        params: {
            id_user: id_user,
            year: filter.year ? filter.year : '',
            month: filter.month ? filter.month : ''
        }
    });

    const { data } = response;
    return data;
}

export const GetIncomePerCategory = async (id_user, filter) => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + PIE_CHART_GET_INCOME_PER_CATEGORY,
        params: {
            id_user: id_user,
            year: filter.year ? filter.year : '',
            month: filter.month ? filter.month : ''
        }
    });

    const { data } = response;
    return data;
}

