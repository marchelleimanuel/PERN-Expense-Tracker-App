import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar"
import { Dropdown } from 'primereact/dropdown';
import { getCategory, postTransaction } from "../../services/Input/inputService";

const Input = () => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Pick a category');
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [notes, setNotes] = useState('');
    const [categories, setCategories] = useState([]);
    const dataUser = JSON.parse(localStorage.getItem('userLogin')) || {};
    
    const getDataCategory = async () => {
        try {
            const response = await getCategory(selectedType);
            if(response.response_code === 'SUCCESS') {
                setCategories(response.data);
            }
        } catch (error) {
            
        }
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
            <div className="w-[87%] p-10">
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
                    <input type="input" value={amount} className="input" onChange={onInputAmount}/> 
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
                <button className="border-2 border-black btn" onClick={onClickSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Input;