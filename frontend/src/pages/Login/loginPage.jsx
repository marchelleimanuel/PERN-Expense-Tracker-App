import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../../services/Login/loginService";


const Login = () => {
    const navigate = useNavigate();
    const [emailOrUsername , setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        message: '',
        typeError: ''
    });

    const login = async () => {
        try {
            const response = await LoginService(emailOrUsername, password)
            
            if(response.response_code === 'SUCCESS') {
                navigate('/home')
            }
        } catch (err) {
            const error = err.response.data.message;
            error.includes('Username/Email') ? setErrorMessage({message:error, typeError:'username/email'}) : setErrorMessage({message:error, typeError:'password'})
        }
    }

    const goToRegisterPage = () => {
        navigate('/register')
    }

    const onEnter = (e) => {
        if (e.key === 'Enter' && emailOrUsername !== '' && password !== '') {
            login();
        }
    }

    const changeEmailOrUsername = e => {
        setEmailOrUsername(e.target.value)
    }

    const changePassword = e => {
        setPassword(e.target.value)
    }

    return (
        
        <div className="flex justify-center items-center h-screen">  
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend text-2xl">Login</legend>

                <label className="label">Email/Username</label>
                <input type="email" className="input" placeholder="Email/Username" onChange={changeEmailOrUsername} onKeyDown={onEnter} />
                {errorMessage.typeError === 'username/email' ? <p className="text-red-500">{errorMessage.message}</p> : ''}
                

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" onChange={changePassword} onKeyDown={onEnter} />
                {errorMessage.typeError === 'password' ? <p className="text-red-500">{errorMessage.message}</p> : ''}

                <button className="btn btn-neutral mt-4" disabled={emailOrUsername === '' || password === '' } onClick={login}>Login</button>
                <div>
                    <p className="cursor-pointer text-right text-sm" onClick={goToRegisterPage}>I don't have an account</p>
                </div>
            </fieldset>
        </div>
    )
}


export default Login;
