import axios from "axios"
import { BAR_CHART_GET_TOTAL_EXPENSE_AND_INCOME, BASE_URL } from "../../routes/urlPath";

export const GetTotalExpenseAndIncome = async (id_user) => {
    const response = await axios({
        method: 'get',
        url: BASE_URL + BAR_CHART_GET_TOTAL_EXPENSE_AND_INCOME,
        params: {
            id_user: id_user
        }
    });

    const { data } = response;
    return data;
}