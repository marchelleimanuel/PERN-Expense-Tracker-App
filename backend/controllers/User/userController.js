import { Op } from "sequelize";
import User from "../../models/User/userModel.js"

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
    
    if(password.length < 10) return res.status(404).json({message: 'Password must atleast 10 characters'})
    if(confirmPassword !== password) return res.status(404).json({message: 'Password doesn\'t match'})
    

    await User.create({
        username: username,
        email: email,
        password: password
    });

    res.status(201).json({
        message: 'User created successfully!'
    });
}

export default userController


