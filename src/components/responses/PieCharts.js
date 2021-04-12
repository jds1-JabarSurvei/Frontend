import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Legend, Cell} from 'recharts';

const PieCharts = ({ answers, options }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        let tempChartName = options.map(option => {
            return option.nilai
        });
        let tempChartCount = new Array(tempChartName.length).fill(0);
        answers.forEach(answer => {
            let idx;
            answer.jawaban.forEach(jawaban => {
                idx = tempChartName.indexOf(jawaban);
                tempChartCount[idx]++;
            })
        })
        let tempMaxCount = tempChartCount.reduce((acc, currentValue) => acc + currentValue);
        let tempChartData = tempChartName.map((name, idx) => {
            return {
                name: name,
                value: tempChartCount[idx]
            }
        });
        tempChartData.sort((a, b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0))
        setChartData(tempChartData);
    }, []);
    const COLORS = [
        '#399f4f',
        '#ff6600',
        '#cc00cc',
        '#008ae6',
        '#802b00',
        '#ff4d4d',
        '#cccc00',
        '#5c5c8a',
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        if (percent == 0){
            return;
        }
        return (
            
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
                <div className="radio-container">
                    <ResponsiveContainer width="100%" height={30 * (chartData.length + 3)}>
                        <PieChart width={400} height={250}>
                            <Legend layout="vertical" align="center" verticalAlign="middle" margin={  0, 100, 10, 0 }/>
                            <Pie data={chartData} 
                                dataKey="value" 
                                nameKey="name" 
                                cx="20%" 
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={100}
                            >
                                {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length ]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            );
}

export default PieCharts;