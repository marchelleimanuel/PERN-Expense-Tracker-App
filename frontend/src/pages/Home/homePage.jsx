import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import { getAmount } from "../../services/Home/homeService";
import { formatToRupiah, getListOfMonth, getListOfYear, getUserInfo } from "../../utilities/utility";
import MoneyBarChart from "../../components/Charts/barChart";
import ExpensePieChart from "../../components/Charts/ExpensePieChart";
import IncomePieChart from "../../components/Charts/IncomePieChart";

const Home = () => {
    const dataUser = getUserInfo();
    const [totalMoney, setTotalMoney] = useState(0);

    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState('');

    const [shownMonth, setShownMonth] = useState('');

    const [dataExpenseWithHighestPercentage, setDataExpenseWithHighestPercentage] = useState([]);
    const [dataIncomeWithHighestPercentage, setDataIncomeWithHighestPercentage] = useState([]);

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const getHighestPercentage = (data) => {
        const total = data.reduce((sum, item) => sum + item.amount, 0);

        const dataWithPercent = data.map(item => ({
            ...item,
            percent: (item.amount / total) * 100
        }));

        const highest = dataWithPercent.reduce((prev, curr) =>
            curr.percent > prev.percent ? curr : prev
        );

        return [highest, total];
    }

    const getHighestIncomePercentageByCategory = (data) => {
        if(data.length === 0) {
            setTotalIncome(0);
            return;
        }

        const [highest, total] = getHighestPercentage(data);
        
        setDataIncomeWithHighestPercentage(highest);
        setTotalIncome(total)
    }

    const getHighestExpensePercentageByCategory = (data) => {
        if(data.length === 0) {
            setTotalExpense(0);
            return;
        }

        const [highest, total] = getHighestPercentage(data);

        setDataExpenseWithHighestPercentage(highest);
        setTotalExpense(total);
    }

    const getTotalAmount = async () => {
        try {
            const response = await getAmount(dataUser.id);
            if(response.response_code === 'SUCCESS') {
                const rupiah = formatToRupiah(response.data);
                setTotalMoney(rupiah);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getListYear = async () => {
            const years = await getListOfYear();
            setYears(years);
        }
        const getListMonth = async () => {
            const months = await getListOfMonth();
            setMonths(months);
        }
        getListYear();
        getListMonth();
    }, []);

    useEffect(() => {
        getTotalAmount();

        const getListYear = async () => {
            const years = await getListOfYear();
            setYears(years);
        }
        getListYear();
    }, [totalMoney])

    const onFilter = (e) => {
        if(e.target.classList.contains('year')) {
            setSelectedYear(e.target.value);
        }
        else if (e.target.classList.contains('month')) {
            setSelectedMonth(e.target.value)
            onSelectedMonth(e.target.value);
        }
    }

    const month = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    }
    

    const onSelectedMonth = (selectedMonth) => {
        const dataMonth = Object.entries(month);

        if(selectedMonth === '') {
            setShownMonth('');
            return;
        }

        dataMonth.forEach((data) => {
            if(selectedMonth == data[0]) {
                setShownMonth(data[1]);
                return;
            }
        });
    }

    return (
        <div className="flex">
            <Sidebar/>
            <div className="w-[87%] p-10 ml-[13%]">
                <h1 className={`text-3xl font-bold`}>Balance: <span className={`font-normal ${totalMoney.toString().startsWith('-') ? 'text-red-500': 'text-black'}`}>{totalMoney}</span></h1>
                <div className="flex justify-end gap-10 mb-1 ">
                    <fieldset className="fieldset  flex items-center text-[15px]">
                        <span className="">Month</span>
                        <select value={selectedMonth} onChange={onFilter} className="select w-[100px] month" >
                            <option></option>
                            {months.map((month, index) => {
                                return <option key={index}>{month}</option>
                            })}
                        </select>
                    </fieldset>
                    <fieldset className="fieldset  flex items-center text-[15px]">
                        <span className="">Year</span>
                        <select value={selectedYear} onChange={onFilter} className="select w-[100px] year" >
                            <option></option>
                            {years.map((year, index) => {
                                return <option key={index}>{year}</option>
                            })}
                        </select>
                    </fieldset>
                </div>
                <div className="flex gap-5">
                    <div className="bg-white p-6 rounded-lg shadow-md w-[30%] text-center">
                        <p className="text-xl font-bold">Expense By Category</p>
                        {<ExpensePieChart onDataLoaded={getHighestExpensePercentageByCategory} year={selectedYear} month={selectedMonth}/> }
                        <p>Highest Expense On {<br/>}<span className="font-bold">{dataExpenseWithHighestPercentage.name}</span></p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md w-[30%] text-center">
                        <p className="text-xl font-bold">Income By Category</p>
                        <IncomePieChart onDataLoaded={getHighestIncomePercentageByCategory} year={selectedYear} month={selectedMonth}/>
                        <p>Highest Income On {<br/>}<span className="font-bold">{dataIncomeWithHighestPercentage.name}</span></p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 w-[50%]">
                        <h2 className="text-xl font-bold text-center">Summary</h2>
                        <div>
                            <p className="text-gray-500 font-semibold">Total Income:</p>
                            <p className="text-2xl font-bold text-green-600">{totalIncome ? formatToRupiah(totalIncome) : 0}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-semibold">Total Expense:</p>
                            <p className="text-2xl font-bold text-red-600">{totalExpense ? formatToRupiah(totalExpense) : 0}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-semibold">Net Income:</p>
                            <p className={`text-2xl font-bold ${(totalIncome - totalExpense).toString().startsWith('-') ? `text-red-600` : `text-green-600`}`}>{formatToRupiah(totalIncome - totalExpense)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
                    <h1 className="font-bold text-2xl text-center">Expense & Income {shownMonth ? shownMonth : ''} {selectedYear ? selectedYear : '2025'}</h1>
                    <MoneyBarChart year={selectedYear} month={selectedMonth}/>
                </div>
            </div>
        </div>
    )
}

export default Home;