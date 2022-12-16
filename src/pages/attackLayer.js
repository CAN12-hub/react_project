import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { format } from 'date-fns'
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AttackChart = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    var labels, data, arrChart;
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Attack Layer',
            },
            tooltip: {
                callbacks: {
                    label: function () {
                        let label = "A chart with Layer 3 DDoS Attack over the last 30 Days.";
                        return label;
                    }
                }
            },
        },
    };
    useEffect(() => {
        fetch("https://workers.cnainani.workers.dev/attack-layer3", { mode: "cors" })
            .then((response) => {
                return response.json();
            })
            .then((dataRes) => {
                dataRes.data.total.timestamps = dataRes.data.total.timestamps.map(element => {
                    let date = element.split('T')[0];
                    let time = format(new Date(element), "HH:mm");
                    return date + " " + time;
                });
                labels = dataRes.data.total.timestamps;
                const result = dataRes.data.total.values.map(element => {
                    return element * 100;
                });
                data = {
                    labels,
                    datasets: [
                        {
                            label: 'Percentage',
                            data: result,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                };
                setContent(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Container>loading screen</Container>;
    }
    return (
        <Container>
            TASK 3:
            <Line options={options} data={content} />
            <hr></hr>
        </Container>
    );
};


export default AttackChart;