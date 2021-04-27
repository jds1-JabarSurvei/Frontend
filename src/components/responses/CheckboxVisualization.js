import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer } from 'recharts';


const CheckboxVisualization = ({ answers, options }) => {
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
        tempChartData.sort((a, b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0))
        setChartData(tempChartData);
    }, []);

    return (
        <div className="checkbox-container">
            <ResponsiveContainer width="100%" height={30 * (chartData.length + 3)}>
                <BarChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    layout="vertical"
                    barSize={30}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 'dataMax + 2']} />
                    <YAxis type="category" dataKey="name" />
                    <Bar dataKey="count" fill="#399F4F">
                        <LabelList dataKey="label" position="right" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CheckboxVisualization;