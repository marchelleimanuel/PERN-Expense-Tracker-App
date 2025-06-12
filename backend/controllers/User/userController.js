import { Op } from "sequelize";
import User from "../../models/User/userModel.js"
import bycryptjs from 'bcryptjs';

const userController = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    const user = await User.findOne({
        where: {
            [Op.or] : {
                username: username,
                email: email
            }
        },
    })

    const dataUsername = user ? user.dataValues.username : ''; 
    const dataEmail = user ? user.dataValues.email : '';

    if(user && dataUsername === username) return res.status(404).json({message: 'Username has already registered'})
    if(user && dataEmail === email) return res.status(404).json({message: 'Email has already registered'})

    const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if(!emailValidation.test(email)) return res.status(404).json({message: 'Email is not valid'})
    
    if(password.length < 10) return res.status(404).json({message: 'Password must atleast 10 characters'})
    if(confirmPassword !== password) return res.status(404).json({message: 'Password doesn\'t match'})

    const salt = await bycryptjs.genSalt(10);
    const hashedPassword = await bycryptjs.hash(password, salt);    

    await User.create({
        username: username,
        email: email,
        password: hashedPassword
    });

    res.status(201).json({
        message: 'User created successfully!',
        response_code: 'SUCCESS'
    });
}

export default userController


