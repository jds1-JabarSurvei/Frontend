import React, { useState, useEffect } from 'react';
import APICall from 'utils/axios';

const Example = () => {
    // This page is using
    // https://jsonplaceholder.typicode.com/
    // for its example API
    const [users, setUsers] = useState([]);

    useEffect(() => {
        APICall.get(`users`)
            .then(res => {
                console.log(res.data);
                setUsers(res.data);
            }).catch(() => {
                console.log('Failed API Call');
            })
    })

    return (
        <div>
            <h1>Example Page with example API</h1>
            <h6>List User:</h6>
            {users.map(user => {
                return (
                    <p>{user.username}</p>
                );
            })}
        </div>
    );
}

export default Example;