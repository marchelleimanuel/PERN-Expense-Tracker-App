import { useState } from "react";
import { useNavigate } from "react-router-dom"
import RegisterService from '../../services/Register/registerService'

const Register = () => {
    const navigate = useNavigate();
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        message: '',
        typeError: ''
    });

    const register = async () => {
        try {
            const response = await RegisterService(username, email, password, confirmPassword)
            
            if(response.response_code === 'SUCCESS') {
                // open modal
                document.getElementById('my_modal_5').showModal()
            }
        } catch (err) {
            const error = err.response.data.message;
            if(error.includes('Username')) {
                setErrorMessage({message:error, typeError:'username'})
            }
            else if (error.includes('Email') && error.includes('registered')) {
                setErrorMessage({message:error, typeError:'registered email'})
            }
            else if (error.includes('Email') && error.includes('valid')) {
                setErrorMessage({message:error, typeError:'invalid email'})
            }
            else if (error.includes('Password') && error.includes('characters')) {
                setErrorMessage({message:error, typeError:'length password'})
            }
            else {
                setErrorMessage({message:error, typeError:'match password'})
            }
        }
    }

    const goToLoginPage = () => {
        navigate('/login')
    }
    
    const changeUsername = e => {
        setUsername(e.target.value)
    }

    const changeEmail = e => {
        setEmail(e.target.value)
    }

    const changePassword = e => {
        setPassword(e.target.value)
    }

    const changeConfirmPassword = e => {
        setConfirmPassword(e.target.value)
    }

    const onEnter = (e) => {
        if (e.key === 'Enter' && username !== '' && email !== '' && password !== '' && confirmPassword !== '') {
            login();
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">  
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend text-2xl">Register</legend>

                <label className="label">Username</label>
                <input type="email" className="input" placeholder="Username" onChange={changeUsername} onKeyDown={onEnter} />
                
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" onChange={changeEmail} onKeyDown={onEnter} />
                
                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" onChange={changePassword} onKeyDown={onEnter} />

                <label className="label">Confirm Password</label>
                <input type="password" className="input" placeholder="Confirm Password" onChange={changeConfirmPassword} onKeyDown={onEnter} />
                {errorMessage.typeError === 'username' ? <p className="text-red-500">{errorMessage.message}</p> : ''}
                {errorMessage.typeError === 'registered email' ? <p className="text-red-500">{errorMessage.message}</p> : ''}
                {errorMessage.typeError === 'invalid email' ? <p className="text-red-500">{errorMessage.message}</p> : ''}
                {errorMessage.typeError === 'length password' ? <p className="text-red-500">{errorMessage.message}</p> : ''}
                {errorMessage.typeError === 'match password' ? <p className="text-red-500">{errorMessage.message}</p> : ''}

                <button className="btn btn-neutral mt-4" disabled={username === '' || password === ''  || email === '' || confirmPassword === ''} onClick={register} >Register</button>
                <div>
                    <p className="cursor-pointer text-center text-sm" onClick={goToLoginPage}>Already have an account?</p>
                </div>
            </fieldset>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Success!</h3>
                    <p className="py-4">Your account successfully created!</p>
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={() => navigate('/login')}>Okay</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Register;