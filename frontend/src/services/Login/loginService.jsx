import axios from "axios"
import * as PATH from "../../routes/urlPath"

const LoginService = async () => {
    const response = await axios({
        method: 'post',
        url: PATH.BASE_URL + PATH.LOGIN_URL,
        data: {
            emailOrUsername,
            password
        } 
    })

    const { data } = response;
    return data;
}

export default LoginService