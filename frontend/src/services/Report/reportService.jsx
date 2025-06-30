import axios from "axios";
import { BASE_URL, REPORT_GET_ALL_DATA_URL } from "../../routes/urlPath";

const getAllReport = async (id_user) => {
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

export default getAllReport;