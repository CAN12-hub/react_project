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


const TrafficChangeChart = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    var labels, data;
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Traffic Change',
            },
            tooltip: {
                callbacks: {
                    label: function () {
                        let label = "The chart should show the comparison between the total traffic change received over the http traffic change";
                        return label;
                    }
                }
            },
        }
    };
    useEffect(() => {
        fetch("https://workers.cnainani.workers.dev/traffic-change", { mode: "cors" })
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
                const result = dataRes.data.total.values;
                const resultHttp = dataRes.data.http.values;
                data = {
                    labels,
                    datasets: [
                        {
                            label: 'Total',
                            data: result,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'Http',
                            data: resultHttp,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        }
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
            TASK 1:
            <div data-tip data-for="registerTip">
                <Line options={options} data={content} />
            </div>
            <hr></hr>
            TASK 2:
        </Container>
    );
};


export default TrafficChangeChart;