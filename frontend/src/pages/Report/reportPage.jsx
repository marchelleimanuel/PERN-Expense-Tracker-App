import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import {deleteReport, getAllReport} from "../../services/Report/reportService";

const Report = () => {
    const [dataTable, setDataTable] = useState([]);
    const userId = JSON.parse(localStorage.getItem('userLogin'))?.id;
    const [transactionId, setTransactionId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState('');

    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Pick a category');
    // const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    // const [notes, setNotes] = useState('');
    const [categories, setCategories] = useState([]);

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
        if(selectedType !== '') {
            getDataCategory();
        }
    },[selectedType])

    
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

    const onSelectRadio = (e) => {
        // resetSelectedType()
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

    
    const getDataReport = async () => {
        try {
            const response = await getAllReport(userId);
            
            if(response.response_code === 'SUCCESS') {
                setDataTable(response.data);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataReport();
    }, [dataTable]);

    const openModalEdit = (data) => {
        console.log(data);
        let formattedDate = data.date.split('T');
        setTransactionId(data.transaction_id);
        setAmount(data.amount);
        setCategory(data.category);
        setSelectedDate(data.date);
        setNotes(data.notes);
        setSelectedType(data.type);
        document.getElementById('edit_modal').showModal()
    }

    const openModalDelete = async (transaction_id) => {
        setTransactionId(transaction_id)
        document.getElementById('delete_modal').showModal()
    }

    const onClickDelete = async () => {
        try {
            const response = await deleteReport(transactionId);

            if(response.response_code === 'SUCCESS') {
                document.getElementById('success_delete_modal').showModal()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const onClickEdit = async () => {

    }

    return (
        <div className="flex">
            <Sidebar/>
            <div className="border-2 w-[87%] p-10">
                {dataTable.length > 0 ? (<table className="table table-xs">
                    <thead>
                        <tr className="text-center text-2xl font-black opacity-100 table-border">
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
                                <td className="table-border table-body-1rem">{data.type}</td>
                                <td className="table-border table-body-1rem">{data.category}</td>
                                <td className="table-border table-body-1rem">{formattedDate[0]}</td>
                                <td className="table-border table-body-1rem">{data.amount}</td>
                                <td className="table-border table-body-1rem">{data.notes ? data.notes : '-'}</td>
                                <td className="table-border text-center w-[15%]">
                                    <button className="btn btn-success text-white" onClick={() => openModalEdit(data)}>Edit</button>&nbsp;
                                    <button className="btn btn-error text-white" onClick={() => openModalDelete(data.id_transaction)}>Delete</button> 
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
                    <div className="modal-box text-center">
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
                        {/* <button className="border-2 border-black btn" onClick={onClickSubmit} disabled={selectedType === '' || selectedCategory === 'Pick a category' || amount === '' || amount === '0' || selectedDate === ''} >Submit</button> */}
                        <div className="modal-action">
                        <form method="dialog">
                            <button className="btn mr-3">Cancel</button>
                            <button className="btn btn-error text-white" onClick={onClickEdit}>Edit</button>
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
                            <button className="btn">Close</button>
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
                            <button className="btn">Close</button>
                        </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    
    )
}

export default Report;