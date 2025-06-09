import User from "../../models/User/userModel.js"

const userController = async (req, res) => {
    const {username, password, email} = req.body;

    await User.create({username, password, email});
    res.send(`Create user success!`);
}

export default userController


