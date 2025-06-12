import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../../services/Login/loginService";


const Login = () => {
    const navigate = useNavigate();
    const [emailOrUsername , setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const response = await LoginService(emailOrUsername, password)
        
        if(response.response_code === 'SUCCESS') {
            navigate('/home')
        }
    }

    const goToRegisterPage = () => {
        navigate('/register')
    }

    const changeEmailOrUsername = e => {
        setEmailOrUsername(e.target.value)
    }

    const changePassword = e => {
        setPassword(e.target.value)
    }

    return (
        <div className="flex justify-center items-center h-screen">  
            <div>
                <h1 className="text-4xl font-bold">Login</h1>
                <div className="">
                    <p>Email/Username</p>
                    <input type="text" className="border-2 border-black" onChange={changeEmailOrUsername}/>
                </div>
                <div className="">
                    <p>Password</p>
                    <input type="password" className="border-2 border-black" onChange={changePassword}/>
                </div>
                <button className="cursor-pointer border-2 border-black" onClick={login}>Login</button>
                <div>
                    <p className="cursor-pointer" onClick={goToRegisterPage}>Create an account</p>
                </div>
            </div>
        </div>
    )
}


export default Login;
