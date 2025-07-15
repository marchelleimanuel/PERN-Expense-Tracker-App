import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { getUserInfo } from '../../utilities/utility';
import { useEffect, useState } from 'react';
import { GetExpensePerCategory, GetIncomePerCategory } from '../../services/Chart/chartService';

const RADIAN = Math.PI / 180;
const COLORS = [ 
    '#D2691E',
    '#40E0D0',
    '#DC143C',
    '#7FFFD4',
    '#A28EFF',
    '#FF6EC7',
    '#50C878',
    '#FFD700',
    '#6495ED',
    '#FF7F50',
    '#B0E0E6',
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const IncomePieChart = (props) => {
    const [dataList, setDataList] = useState([]);
    const dataUser = getUserInfo();

    const getDataList = async () => {
        const filter = {
            year: props.year ? props.year : '',
            month: props.month ? props.month : ''
        }

        try {
            const response = await GetIncomePerCategory(dataUser.id, filter);
            if(response.response_code === 'SUCCESS') {      
                setDataList(response.data);
                props.onDataLoaded(response.data);
            }
        } catch (error) {
            // console.log('error');
        }
    }

    useEffect(() => {
        getDataList()
    },[props.year, props.month])

    return (
        dataList.length > 0 ? (
            <ResponsiveContainer height={200} >
                <PieChart width={200} height={200}>
                <Pie
                    data={dataList}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                >
                    {dataList.map((data, index) => (
                    <Cell key={`cell-${data.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip 
                    formatter={(amount, category) => {
                        const formatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                        }).format(amount);
                        return [formatted, category];
                    }}
                />
                </PieChart>
            </ResponsiveContainer>
        ) : (
            <div className="flex justify-center items-center h-[200px] text-sm">
                No Transaction
            </div>
        )
    );
}

export default IncomePieChart;