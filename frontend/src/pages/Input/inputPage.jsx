import Sidebar from "../../components/Sidebar/sideBar"
import { Dropdown } from 'primereact/dropdown';

const Input = () => {

    const onClickRadio = (e) => {
        // e.stopPropagation();
        console.log(e.target.value)
    }

    return (
        <div className="flex">
            <Sidebar/>
            <div className="border-2 border-red-500 w-[87%] p-10">
                <div className="w-1/2">
                    <p>Type</p>
                    <label onChange={onClickRadio}>
                        <input type="radio" value={'Income'} name="options"/>
                        Income
                    </label>
                    <label onChange={onClickRadio}>
                        <input type="radio" value={'Expense'} name="options"/>
                        Expense
                    </label>
                </div>
                {/* dropdown */}
                
                <div>
                    <p>Category</p>
                    <input type="text" className="border-2 border-black w-1/2" />
                </div>

                {/* input biasa */}
                <div>
                    <p>Amount</p>
                    <input type="text" className="border-2 border-black w-1/2" />
                </div>

                {/* Date picker */}
                <div>
                    <p>Date</p>
                    <input type="text" className="border-2 border-black w-1/2" />
                </div>

                {/* Areatext */}
                <div>
                    <p>Notes</p>
                    <input type="text" className="border-2 border-black w-1/2" />
                </div>
                <button className="border-2 border-black">Submit</button>
            </div>
        </div>
    )
}

export default Input;