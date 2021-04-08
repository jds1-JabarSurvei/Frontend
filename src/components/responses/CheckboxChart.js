import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, Legend } from 'recharts';


const CheckboxChart = ({ answers, options }) => {
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
                count: tempChartCount[idx],
                label: tempChartCount[idx].toString() + " - (" + (tempChartCount[idx] * 100 / tempMaxCount).toFixed(2).toString() + "%)"
            }
        });
        setChartData(tempChartData);
    }, []);

    return (
        <div className="checkbox-container">
            {/* <h1>Checkbox Containerrr</h1> */}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    // width={500}
                    // height={500}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 'dataMax + 2']} />
                    <YAxis type="category" dataKey="name" />
                    {/* <Tooltip />
                    <Legend /> */}
                    <Bar dataKey="count" fill="#8884d8">
                        <LabelList dataKey="label" position="right" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CheckboxChart;