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

const MoneyBarChart = (props) => {
    const [dataList, setDataList] = useState([]);
    const dataUser = getUserInfo();

    const getDataList = async () => {
        const filter = {
            year: props.year ? props.year : '',
            month: props.month ? props.month : ''
        }
        try {
            const response = await GetTotalExpenseAndIncome(dataUser.id, filter);
            if(response.response_code === 'SUCCESS') {
                setDataList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataList();
    }, [props.year, props.month]);

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
