import { UpdateModeEnum } from 'chart.js';
import React from 'react';
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
var list, result;

const PopularDomains = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://workers.cnainani.workers.dev/popular-domains", { mode: "cors" })
            .then((response) => {
                return response.json();
            })
            .then((dataRes) => {
                list = dataRes.rankingEntries;
                result = JSON.parse(JSON.stringify(list));
                result.forEach(function (obj) {
                    obj.rank = obj.rank + obj.rankChange
                });
                result.sort(sortByProperty("rank"));
                setLoading(false)
            });
    }, []);

    function getColor(value) {
        if (value == 0) {
            return 'RGB(255, 255, 255)';
        } else {
            return 'RGB(255,255,0)';
        }
    }
    function sortByProperty(property) {
        return function (a, b) {
            if (a[property] > b[property])
                return 1;
            else if (a[property] < b[property])
                return -1;

            return 0;
        }
    }
    if (loading) {
        return <Container>loading screen</Container>;
    }
    return (
        <Container>
            <table style={{ 'border': '2px solid forestgreen', 'display': 'inline-block' }}>
                <tr>
                    <th style={{ 'border': '2px solid forestgreen' }}>Rank</th>
                    <th style={{ 'border': '2px solid forestgreen' }}>Domain</th>
                    <th style={{ 'border': '2px solid forestgreen' }}>Category</th>
                </tr>
                {list.map(item => (
                    <tr>
                        <td style={{ backgroundColor: getColor(item.rankChange), 'border': '2px solid forestgreen' }}>{item.rank}</td>
                        <td style={{ backgroundColor: getColor(item.rankChange), 'border': '2px solid forestgreen' }}>{item.domain}</td>
                        <td style={{ backgroundColor: getColor(item.rankChange), 'border': '2px solid forestgreen' }}>{item.category}</td>
                    </tr>
                ))}
            </table>
            <table style={{ 'border': '2px solid forestgreen', 'display': 'inline-block' }}>
                <tr>
                    <th style={{ 'border': '2px solid forestgreen' }}> Rank</th>
                    <th style={{ 'border': '2px solid forestgreen' }}>Domain</th>
                    <th style={{ 'border': '2px solid forestgreen' }}>Category</th>
                </tr>
                {result.map(item => (
                    <tr>
                        <td style={{ backgroundColor: getColor(item.rankChange), 'border': '2px solid forestgreen' }}>{item.rank}</td>
                        <td style={{ backgroundColor: getColor(item.rankChange), 'border': '2px solid forestgreen' }}>{item.domain}</td>
                        <td style={{ backgroundColor: getColor(item.rankChange), 'border': '2px solid forestgreen' }}>{item.category}</td>
                    </tr>
                ))}
            </table>
            <hr></hr>
        </Container>
    );
};


export default PopularDomains;




