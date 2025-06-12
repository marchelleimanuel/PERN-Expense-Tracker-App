import axios from 'axios';
import * as PATH from '../../routes/urlPath' 

const RegisterService = async (username, email, password, confirmPassword) => {
    const response = await axios({
        method: 'post',
        url: PATH.BASE_URL + PATH.REGISTER_URL,
        data: {
            username, 
            email,
            password, 
            confirmPassword
        }
    })
    const { data } = response;
    return data;
}

export default RegisterService;
