import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import { getAmount } from "../../services/Home/homeService";
import { getListOfYear, getUserInfo } from "../../utilities/utility";
import MoneyBarChart from "../../components/Charts/barChart";

const Home = () => {
    const dataUser = getUserInfo();
    const [totalMoney, setTotalMoney] = useState(0);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const getTotalAmount = async () => {
        try {
            const response = await getAmount(dataUser.id);
            
            if(response.response_code === 'SUCCESS') {
                const formatter = Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
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

        const getListYear = async () => {
            const years = await getListOfYear();
            setYears(years);
        }
        getListYear();
    }, [totalMoney])

    const onFilter = (e) => {
        setSelectedYear(e.target.value);
    }

    return (
        <div className="flex">
            <Sidebar/>
            <div className="w-[87%] p-10 ">
                <h1 className={`text-3xl`}>My Balance: <span className={`${totalMoney.toString().startsWith('-') ? 'text-red-500': 'text-black'}`}>{totalMoney}</span></h1>
                <div className="flex justify-end w-[98%] pr-6">
                    <fieldset className="fieldset  flex items-center text-[15px]">
                        <span className="">Filter</span>
                        <select value={selectedYear} onChange={onFilter} className="select w-[100px]" >
                            {years.map((year, index) => {
                                return <option key={index}>{year}</option>
                            })}
                        </select>
                    </fieldset>
                </div>
                <div>
                    <MoneyBarChart year={selectedYear}/>
                </div>
            </div>
        </div>
    )
}

export default Home;