import { Routes, Route as R } from "react-router-dom";
import Login from '../pages/Login/loginPage'
import Register from '../pages/Register/registerPage';
import Home from "../pages/Home/homePage";
import Input from "../pages/Input/inputPage";
import Report from "../pages/Report/reportPage";

const Route = () => {
    return (
        <Routes>
            <R path='/' element={<Login/>} />
            <R path='/login' element={<Login/>} />
            <R path='/register' element={<Register/>} />   
            <R path='/home' element={<Home/>} />   
            <R path='/input' element={<Input/>} />   
            <R path='/report' element={<Report/>} />   
        </Routes>
    )
}

export default Route;