import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar"
import { Dropdown } from 'primereact/dropdown';
import { getCategory } from "../../services/Input/inputService";

const Input = () => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [notes, setNotes] = useState('');
    const [categories, setCategories] = useState([]);
    
        const getDataCategory = async () => {
            try {
                const response = await getCategory();
                if(response.response_code === 'SUCCESS') {
                    setCategories(response.data);
                }
            } catch (error) {
                
            }
        }

    useEffect(() => {
        getDataCategory();
    },[categories])

    const onSelectRadio = (e) => {
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
                        <label onChange={onSelectRadio} >
                            <input type="radio" name="options" className="radio radio-xs" value={'Income'}/>
                            Income
                        </label>
                        <label onChange={onSelectRadio} className="ml-5">
                            <input type="radio" name="options" className="radio radio-xs" value={'Expense'}/>
                            Expense
                        </label>
                    </div>
                </fieldset>
                {/* dropdown */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Category</legend>
                    <select defaultValue="Pick a category" className="select" onChange={onSelectCategory}>
                        <option disabled={true}>Pick a category</option>
                        {categories.map((category, index) => {
                            return <option key={index}>{category.category_name}</option>
                        })}
                    </select>
                </fieldset>
                {/* input biasa */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Amount</legend>
                    <input type="input" className="input" onChange={onInputAmount}/> 
                </fieldset>

                {/* Date picker */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Date</legend>
                    <input type="date" className="input" onChange={onSelectDate}/> 
                </fieldset>

                {/* Areatext */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Notes (Optional)</legend>
                    <textarea className="textarea h-24" placeholder="Notes" onChange={onInputNotes}></textarea>
                </fieldset>
                <button className="border-2 border-black btn">Submit</button>
            </div>
        </div>
    )
}

export default Input;