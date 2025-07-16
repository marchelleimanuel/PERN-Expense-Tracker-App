import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import {deleteReport, editReport, getAllReport} from "../../services/Report/reportService";
import { getCategory } from "../../services/Input/inputService";
import { formatToRupiah, getListOfDay, getListOfMonth, getListOfYear, getUserInfo } from "../../utilities/utility";

const Report = () => {
    const userId = JSON.parse(localStorage.getItem('userLogin'))?.id;
    const dataUser = getUserInfo();

    const [dataTable, setDataTable] = useState([]);
    const [transactionId, setTransactionId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [notes, setNotes] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Pick a category');
    const [selectedDate, setSelectedDate] = useState('');
    const [categories, setCategories] = useState([]);
    
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [days, setDays] = useState([]);

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [type, setType] = useState('');

    const [isEdited, setIsEdited] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const types = ['Expense', 'Income'];

    const getDataCategory = async () => {
        try {
            const response = await getCategory(selectedType);
            if(response.response_code === 'SUCCESS') {
                setCategories(response.data);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataCategory();
    }, [selectedType])

    const onSelectCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    const onInputAmount = (e) => {
        setAmount(e.target.value);
    }

    const onSelectDate = (e) => {
        setSelectedDate(e.target.value);
    }

    const onInputNotes = (e) => {
        setNotes(e.target.value);
    }

    const onFilter = (e) => {
        let value = e.target.value;
        if(value === 'All') {
            value = '';
        }

        if(e.target.classList.contains('year')) {
            setSelectedYear(value);
        }
        else if (e.target.classList.contains('month')) {
            setSelectedMonth(value)
        }
        else if(e.target.classList.contains('day')) {
            setSelectedDay(value)
        }
        else {
            setType(value)
        }
    }

    
    const getDataReport = async () => {
        const filter = {
            years: selectedYear ? selectedYear : '',
            months: selectedMonth ? selectedMonth : '',
            days: selectedDay ? selectedDay : '',
            type: type ? type : '',
        }

        try {
            const response = await getAllReport(userId, filter);
            
            if(response.response_code === 'SUCCESS') {
                setDataTable(response.data);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataReport();
    }, [selectedYear, selectedMonth, selectedDay, isEdited, isDeleted, type]);

    useEffect(() => {
        const getListYear = async () => {
            const years = await getListOfYear();
            setYears(years);
        }
        const getListMonth = async () => {
            const months = await getListOfMonth();
            setMonths(months);
        }
        const getListDay = async () => {
            const days = await getListOfDay();
            setDays(days);
        }
        getListYear();
        getListMonth();
        getListDay();
    }, []);

    const openModalDelete = async (data) => {
        setTransactionId(data.id_transaction);
        setSelectedType(data.type);
        document.getElementById('delete_modal').showModal()
    }

    const onClickDelete = async () => {
        try {
            const response = await deleteReport(transactionId, selectedType);

            if(response.response_code === 'SUCCESS') {
                document.getElementById('success_delete_modal').showModal()
            }

        } catch (error) {
            console.log(error);
        }
        setIsDeleted(false);
    }

    const openModalEdit = (data) => {
        let formattedDate = data.date.split('T');
        setTransactionId(data.id_transaction);
        setAmount(data.amount);
        setSelectedCategory(data.category);
        setSelectedDate(formattedDate[0]);
        setNotes(data.notes);
        setSelectedType(data.type);
        document.getElementById('edit_modal').showModal()
    }

    const onClickEdit = async () => {
        const data = {
            category: selectedCategory,
            amount: amount,
            date: selectedDate,
            notes: notes ? notes : '',
            id_user: dataUser.id ? dataUser.id : '',
            id_transaction: transactionId,
            type: selectedType
        }

        try {
            const response = await editReport(data);
            document.getElementById('success_edit_modal').showModal()
        } catch (error) {
            console.log(error.response.data.message);
        }
        setIsEdited(false);
    }

    return (
        <div className="flex">
            <Sidebar/>
            <div className="w-[87%] p-10 ml-[13%]">
                <div className="flex justify-end gap-10">
                    <fieldset className="fieldset flex items-center text-[15px]">
                        <span className="">Type</span>
                        <select value={type} onChange={onFilter} className="select w-[100px] type" >
                            <option>All</option>
                            {types.map((type, index) => {
                                return <option key={index}>{type}</option>
                            })}
                        </select>
                    </fieldset>
                    <fieldset className="fieldset  flex items-center text-[15px]">
                        <span className="">Day</span>
                        <select value={selectedDay} onChange={onFilter} className="select w-[100px] day" >
                            <option>All</option>
                            {days.map((day, index) => {
                                return <option key={index}>{day}</option>
                            })}
                        </select>
                    </fieldset>
                    <fieldset className="fieldset  flex items-center text-[15px]">
                        <span className="">Month</span>
                        <select value={selectedMonth} onChange={onFilter} className="select w-[100px] month" >
                            <option>All</option>
                            {months.map((month, index) => {
                                return <option key={index}>{month}</option>
                            })}
                        </select>
                    </fieldset>
                    <fieldset className="fieldset  flex items-center text-[15px]">
                        <span className="">Year</span>
                        <select value={selectedYear} onChange={onFilter} className="select w-[100px] year" >
                            <option>All</option>
                            {years.map((year, index) => {
                                return <option key={index}>{year}</option>
                            })}
                        </select>
                    </fieldset>
                </div>
                {dataTable.length > 0 ? (<table className="table table-xs">
                    <thead>
                        <tr className="text-center text-2xl font-black opacity-100 table-border">
                            <th className="table-border">No</th>
                            <th className="table-border">Type</th>
                            <th className="table-border">Category</th>
                            <th className="table-border">Date</th>
                            <th className="table-border">Amount</th>
                            <th className="table-border">Notes</th>
                            <th className="table-border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((data, index) => {
                            let formattedDate = data.date.split('T');
                            return <tr className="table-border" key={index}>
                                <td className="table-border table-body-1rem">{index+1}</td>
                                <td className="table-border table-body-1rem">{data.type}</td>
                                <td className="table-border table-body-1rem">{data.category}</td>
                                <td className="table-border table-body-1rem">{formattedDate[0]}</td>
                                <td className="table-border table-body-1rem">{formatToRupiah(data.amount)}</td>
                                <td className="table-border table-body-1rem">{data.notes ? data.notes : '-'}</td>
                                <td className="table-border text-center w-[15%]">
                                    <button className="btn btn-success text-white" onClick={() => openModalEdit(data)}>Edit</button>&nbsp;
                                    <button className="btn btn-error text-white" onClick={() => openModalDelete(data)}>Delete</button> 
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>) : <h1 className="text-xl font-bold">No Transaction</h1>}
                <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">IMPORTANT!</h3>
                        <p className="py-4 text-xl">Are you sure want to delete it?</p>
                        <div className="modal-action">
                        <form method="dialog">
                            <button className="btn mr-3">Cancel</button>
                            <button className="btn btn-error text-white" onClick={onClickDelete}>Delete</button>
                        </form>
                        </div>
                    </div>
                </dialog>
                <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box ">
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
                        <div className="modal-action">
                        <form method="dialog">
                            <button className="btn mr-3">Cancel</button>
                            <button className="btn btn-success text-white" onClick={onClickEdit} disabled={selectedCategory === 'Pick a category' || amount === '' || amount === '0' || selectedDate === ''}>Edit</button>
                        </form>
                        </div>
                    </div>
                </dialog>
                <dialog id="success_delete_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">NOTIFICATION</h3>
                        <p className="py-4 text-xl">Data deleted successfully!</p>
                        <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={() => setIsDeleted(true)}>Close</button>
                        </form>
                        </div>
                    </div>
                </dialog>
                <dialog id="success_edit_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">NOTIFICATION</h3>
                        <p className="py-4 text-xl">Data edited successfully!</p>
                        <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={() => setIsEdited(true)}>Close</button>
                        </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    
    )
}

export default Report;