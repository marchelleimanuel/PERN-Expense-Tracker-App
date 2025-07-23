import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar"
import { getCategory, getRecentTransaction, getTopSpendingTransaction, postTransaction } from "../../services/Input/inputService";
import { formatDate, formatPercentage, formatToRupiah, getUserInfo } from "../../utilities/utility";
import { useNavigate } from "react-router-dom";

const Input = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Pick a category');
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [notes, setNotes] = useState('');
    const [categories, setCategories] = useState([]);
    const dataUser = getUserInfo();
    const [topSpending, setTopSpending] = useState([]);
    const [recentTransaction, setRecentTransaction] = useState([]);
    const [transaction, setTransaction] = useState([]);
    
    const getDataCategory = async () => {
        try {
            const response = await getCategory(selectedType);
            if(response.response_code === 'SUCCESS') {
                setCategories(response.data);
            }
        } catch (error) {
            
        }
    }

    const getRecent = async () => {
        try {
            const response = await getRecentTransaction(dataUser.id);
            setRecentTransaction(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTopSpending = async () => {
        try {
            const response = await getTopSpendingTransaction(dataUser.id);
            const sortedData = calculateRecentTransaction(response.data);
            setTopSpending(sortedData);
        } catch (error) {
            console.log(error);
        }
    }

    const calculateRecentTransaction = (data) => {

        const total = data.reduce((sum, data) => {
            return sum + data.amount
        }, 0)

        const dataWithPercent = data.map(item => ({
            ...item,
            percentage: (item.amount / total) * 100
        })).sort((a, b) => b.percentage - a.percentage);
        
        return dataWithPercent;
    }

    const onClickSubmit = async () => {

        const data = {
            type: selectedType ? selectedType : '',
            category: selectedCategory === 'Pick a category' ? '' : selectedCategory,
            amount: amount ? amount : '',
            date: selectedDate ? selectedDate : '',
            notes: notes ? notes : '',
            id_user: dataUser.id ? dataUser.id : ''
        }

        try {
            const response = await postTransaction(data);
            setTransaction(response.data);
            reset();
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {        
        if(selectedType !== '') {
            getDataCategory();
        }
    },[selectedType])

    useEffect(() => {
        getTopSpending();
        getRecent();
    }, [transaction])

    const reset = () => {
        setSelectedType('');
        setSelectedCategory('Pick a category');
        setAmount('');
        setSelectedDate('');
        setNotes('');
    }

    const resetSelectedType = () => {
        setSelectedCategory('Pick a category');
    }

    const onSelectRadio = (e) => {
        resetSelectedType()
        setSelectedType(e.target.value);
    }

    const onSelectCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    const onInputAmount = (e) => {
        // Inputnya masih bisa huruf.. harusnya angka doang
        setAmount(e.target.value);
    }

    const onSelectDate = (e) => {
        setSelectedDate(e.target.value);
    }

    const onInputNotes = (e) => {
        setNotes(e.target.value);
    }

    return (
        <div> 
            <Sidebar/>
            <div className="md:w-[87%] p-10 md:ml-[13%] flex flex-col lg:flex-row gap-5 w-full">
                <div className="input-form border-1border-black w-full lg:w-[50%]">
                    <fieldset className="w-1/2 fieldset">
                        <legend className="fieldset-legend">Type</legend>
                        <div>
                            <label>
                                <input type="radio" name="options" onChange={onSelectRadio} checked={selectedType === 'Income' ? true : false} className="radio radio-xs" value={'Income'}/>
                                Income
                            </label>
                            <label  className="ml-5">
                                <input type="radio" name="options"  onChange={onSelectRadio} checked={selectedType === 'Expense'  ? true : false} className="radio radio-xs" value={'Expense'}/>
                                Expense
                            </label>
                        </div>
                    </fieldset>
                    {/* dropdown */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Category</legend>
                        <select value={selectedCategory} className="select" onChange={onSelectCategory}>
                            <option disabled>Pick a category</option>
                            {categories.map((category, index) => {
                                return <option key={index}>{selectedType === 'Income' ? category.income_category_name : category.expense_category_name}</option>
                            })}
                        </select>
                    </fieldset>
                    {/* input biasa */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Amount</legend>
                        <input type="number" value={amount} min={'1'} className="input" onChange={onInputAmount}/> 
                    </fieldset>

                    {/* Date picker */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Date</legend>
                        <input type="date" className="input" value={selectedDate} onChange={onSelectDate}/> 
                    </fieldset>

                    {/* Areatext */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Notes (Optional)</legend>
                        <textarea className="textarea h-24" placeholder="Notes" value={notes} onChange={onInputNotes}></textarea>
                    </fieldset>
                    <button className="border-2 btn mt-5 btn-success text-white" onClick={onClickSubmit} disabled={selectedType === '' || selectedCategory === 'Pick a category' || amount === '' || amount === '0' || selectedDate === ''} >Submit</button>
                </div>

                <div className="recent-transaction w-full lg:w-[50%] space-y-10">
                    <div className="top-spending">
                        <h2 className="text-gray-700 font-bold text-xl text-center">Top Spending</h2>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {topSpending.map((data) => {
                                return <div key={data.name} className="mb-4">
                                    <div className="flex justify-between">
                                        <p className="font-bold">{data.name}</p>
                                        <p className="text-red-500">{formatPercentage(data.percentage)}%</p>
                                    </div>
                                    <p className="text-gray-500">{formatToRupiah(data.amount)}</p>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="recent-transaction">
                        <div className="flex justify-between px-5">
                            <h2 className="text-gray-700 font-bold text-xl">Recent Transaction</h2>
                            <p className="underline cursor-pointer" onClick={() => navigate('/report')}>View All</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {recentTransaction.map((data, index) => {
                                if(index <= 2) {
                                    return <div key={index} className="mb-4">
                                        <div className="flex justify-between">
                                            <p className="font-bold">{data.category_name}</p>
                                            <p className={`${data.type === 'Income' ? 'text-green-500' : 'text-red-500'}`}>{formatToRupiah(data.amount)}</p>
                                        </div>
                                        <p className="text-gray-500">{formatDate(data.date)}</p>
                                    </div>
                                }
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Input;