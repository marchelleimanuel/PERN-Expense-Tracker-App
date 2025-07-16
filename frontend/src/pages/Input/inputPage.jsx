import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar"
import { Dropdown } from 'primereact/dropdown';
import { getCategory, getRecentTransaction, postTransaction } from "../../services/Input/inputService";
import { formatPercentage, formatToRupiah, getUserInfo } from "../../utilities/utility";

const Input = () => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Pick a category');
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [notes, setNotes] = useState('');
    const [categories, setCategories] = useState([]);
    const dataUser = getUserInfo();
    const [dataRecent, setDataRecent] = useState([]);
    
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
            const sortedData = calculateRecentTransaction(response.data.data);
            setDataRecent(sortedData);
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
            reset();
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {        
        if(selectedType !== '') {
            getDataCategory();
        }
        getRecent();

        // if(dataRecent.length > 0) {
        //     calculateRecentTransaction();
        // }
    },[selectedType])

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
        <div className="flex"> 
            <Sidebar/>
            <div className="w-[87%] p-10 ml-[13%] flex">
                <div className="input-form border-1 border-black w-[50%]">
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
                    <button className="border-2 border-black btn" onClick={onClickSubmit} disabled={selectedType === '' || selectedCategory === 'Pick a category' || amount === '' || amount === '0' || selectedDate === ''} >Submit</button>
                </div>

                <div className="recent-transaction border-1 border-black w-[50%]">
                    <h2 className="text-gray-700 font-bold text-xl">Top Spending</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {dataRecent.map((data) => {
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
            </div>
        </div>
    )
}

export default Input;