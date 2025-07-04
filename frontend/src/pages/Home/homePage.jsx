import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import { getAmount } from "../../services/Home/homeService";
import { getUserInfo } from "../../utilities/utility";

const Home = () => {
    const dataUser = getUserInfo();
    const [totalMoney, setTotalMoney] = useState(0);

    const getTotalAmount = async () => {
        try {
            const response = await getAmount(dataUser.id);
            
            if(response.response_code === 'SUCCESS') {
                const formatter = Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                });

                const rupiah = formatter.format(response.data);

                setTotalMoney(rupiah);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTotalAmount();
    }, [totalMoney])

    return (
        <div className="flex">
            <Sidebar/>
            <h1 className="text-3xl">My Balance: {totalMoney}</h1>
        </div>
    )
}

export default Home;