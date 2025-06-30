import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sideBar";
import getAllReport from "../../services/Report/reportService";

const Report = () => {
    const [dataTable, setDataTable] = useState([]);
    const userId = JSON.parse(localStorage.getItem('userLogin'))?.id;
    
    const getDataReport = async () => {
        try {
            const response = await getAllReport(userId);
            setDataTable(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataReport();
    }, []);

    return (
        <div className="flex">
            <Sidebar/>
            <div className="border-2 border-red-500 w-[87%]">
                <table className="table table-xs">
                    <thead>
                        <tr className="text-center">
                            <th>Type</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable ? dataTable.map((data, index) => {
                            return <tr key={index}>
                                <td>{data.type}</td>
                                <td>{data.category}</td>
                                <td>{data.date}</td>
                                <td>{data.amount}</td>
                                <td>{data.notes}</td>
                            </tr>
                        }) : <h1>No Transaction</h1>}
                    </tbody>
                </table>
            </div>
        </div>
    
    )
}

export default Report;