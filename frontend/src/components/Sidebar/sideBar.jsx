import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const menus = (logo, name, key) => {
        return (
            <div key={key} className={`flex gap-2 p-2 hover:bg-black hover:opacity-75 cursor-pointer hover:text-white ${name === 'Logout' ? 'text-red-500' : 'text-black'} `} onClick={() => onMenuClicked(name)} >
                <div>{logo}</div>
                <p>{name}</p>
            </div>
        ) 
    }
    const onMenuClicked = (menuName) => {
        if(menuName === 'Home') navigate('/home')
        if(menuName === 'Input') navigate('/input')
        if(menuName === 'Finance Report') navigate('/report')
        if(menuName === 'Logout') {
            document.getElementById('logout_modal').showModal()
        }
    }

    const logos = ['logo','logo','logo', 'logo'];
    const menuName = ['Home', 'Input', 'Finance Report', 'Logout'];

    return (
        <>
            <div className="inline-block w-[13%] border-2 border-black fixed top-0 bottom-0">
                {
                    logos.map((logo, i) => {
                        const menu = menuName[i];
                        return menus(logo, menu, i);
                    })
                } 
            </div>
            
            <dialog id="logout_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <p className="py-4 text-2xl">Are you sure want to logout?</p>
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Close</button>
                    <button className="btn btn-error text-white ml-2" onClick={() => navigate('/login')}>Yes</button>
                </form>
                </div>
            </div>
            </dialog>
        </>
    )
}

export default Sidebar;