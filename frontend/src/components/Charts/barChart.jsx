import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { GetTotalExpenseAndIncome } from '../../services/Chart/chartService';
import { getUserInfo } from '../../utilities/utility';

const MoneyBarChart = () => {
    const [dataList, setDataList] = useState([]);
    const dataUser = getUserInfo();

    const getDataList = async () => {
        try {
            const response = await GetTotalExpenseAndIncome(dataUser.id);
            if(response.response_code === 'SUCCESS') {
                setDataList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataList();
    }, []);

    return (
        <ResponsiveContainer width="98%" height={300}>
        <BarChart
            data={dataList}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
                formatter={(value, name) => {
                    const formatted = new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                    }).format(value);
                    return [formatted, name === 'income' ? 'Income' : 'Expense'];
                }}
            />

            <Legend />
            <Bar
                dataKey="income"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
            <Bar
                dataKey="expense"
                fill="#FF6961"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
        </BarChart>
        </ResponsiveContainer>
    );
};

export default MoneyBarChart;
