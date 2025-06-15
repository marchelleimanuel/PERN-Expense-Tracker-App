import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const menus = (logo, name, key) => {
        return (
            <div key={key} className={`flex gap-2 p-2 hover:bg-black hover:opacity-75 cursor-pointer hover:text-white ${name}`} onClick={() => onMenuClicked(name)} >
                <div>{logo}</div>
                <p>{name}</p>
            </div>
        ) 
    }
    const onMenuClicked = (menuName) => {
        if(menuName === 'Home') navigate('/home')
        if(menuName === 'Input') navigate('/input')
        if(menuName === 'Finance Report') navigate('/report')
    }

    const logos = ['logo','logo','logo'];
    const menuName = ['Home', 'Input', 'Finance Report'];

    return (
        <div className="inline-block h-screen w-56 border-2 border-black">
            {
                logos.map((logo, i) => {
                    const menu = menuName[i];
                    // return menus(logo, menu, onMenuClicked(menu))
                    return menus(logo, menu, i);
                })
            } 
        </div>
    )
}

export default Sidebar;