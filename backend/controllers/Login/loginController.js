import { Op } from 'sequelize';
import User from '../../models/User/userModel.js';
import bcryptjs from 'bcryptjs';
import { SUCCESS_CODE } from '../../common/common.js';

const LoginController = async (req, res) => {
    const {emailOrUsername, password} = req.body;

    const user = await User.findOne({
        where: {
            [Op.or] : {
                username: emailOrUsername,
                email: emailOrUsername
            }
        }
    })

    if(!user) return res.status(404).json({message: 'Username/Email doesn\'t exist' });
    
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if(!isPasswordMatch) return res.status(404).json({message: 'Invalid Password' });

    return res.status(201).json({
        response_code: SUCCESS_CODE,
        message: 'Login Success'
    })
}

export default LoginController