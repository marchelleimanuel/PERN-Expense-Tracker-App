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
        if(menuName === 'Report') navigate('/report')
        if(menuName === 'Logout') {
            document.getElementById('logout_modal').showModal()
        }
    }

    const logos = ['🏠','✏️','📃', '🚪'];
    const menuName = ['Home', 'Input', 'Report', 'Logout'];

    return (
        <>
            <div className="md:inline-block w-[13%] border-2 border-black fixed top-0 bottom-0 hidden">
                {
                    logos.map((logo, i) => {
                        const menu = menuName[i];
                        return menus(logo, menu, i);
                    })
                } 
            </div>

            <div className="navbar bg-base-100 shadow-sm md:hidden">
                <div className="flex-none">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            logos.map((logo, i) => {
                                const menu = menuName[i];
                                return menus(logo, menu, i);
                            })
                        } 
                    </ul>
                    </div>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">MyMoney</a>
                </div>
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