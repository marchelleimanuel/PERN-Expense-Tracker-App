import { Routes, Route as R } from "react-router-dom";
import Login from '../pages/Login/loginPage'
import Register from '../pages/Register/registerPage';

const Route = () => {
    return (
        <Routes>
            <R path='/' element={<Register/>} />
            <R path='/login' element={<Login/>} />
            <R path='/register' element={<Register/>} />   
        </Routes>
    )
}

export default Route;