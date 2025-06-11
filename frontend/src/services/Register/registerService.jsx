import axios from 'axios';
import * as PATH from '../../routes/urlPath' 

const register = async (username, email, password, confirmPassword) => {
    const response = await axios({
        method: 'post',
        url: PATH.BASE_URL + PATH.REGISTER,
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

export default register;
