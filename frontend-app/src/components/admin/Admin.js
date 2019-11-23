import React from 'react';
import '../bootstrap.min.css';
import './admin.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Admin() {

    let messagesArray = [];

    const fetchMessages = async () => {

        const url = 'http://127.0.0.1/api/getmessages'

        const options = {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
            }),
            mode: 'cors'
        }

        return fetch(url, options)
            .then(response => {
                if (response.ok) {
                    console.log("Retrieving messages... Response " + response.status);
                    return response.json();
                } else {
                    console.log("Couldn't retrieve messages.");
                    return Promise.reject(response.status);
                }
            })
            .then(response => {
                messagesArray = response.map(message => {
                    return response[message];
                });
                console.log("messagesArray ahora es igual a:\n" + messagesArray);
            })
            .catch(response => {
                console.log("Algo salió mal: " + response.statusText)
            })

    };


    fetchMessages();


    return (
        <div className="container">
            <h1>Admin panel</h1>

            <Paper className="messagetable">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Created at</TableCell>
                            <TableCell align="right">Last updated</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Message</TableCell>
                            <TableCell align="right">Media URL</TableCell>
                            <TableCell align="right">Showing</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell align="right">2</TableCell>
                            <TableCell align="right">3</TableCell>
                            <TableCell align="right">4</TableCell>
                            <TableCell align="right">5</TableCell>
                            <TableCell align="right">6</TableCell>
                            <TableCell align="right">7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell align="right">2</TableCell>
                            <TableCell align="right">3</TableCell>
                            <TableCell align="right">4</TableCell>
                            <TableCell align="right">5</TableCell>
                            <TableCell align="right">6</TableCell>
                            <TableCell align="right">7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell align="right">2</TableCell>
                            <TableCell align="right">3</TableCell>
                            <TableCell align="right">4</TableCell>
                            <TableCell align="right">5</TableCell>
                            <TableCell align="right">6</TableCell>
                            <TableCell align="right">7</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>

            {/*
            {rows.map(row => (
                <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
            ))}
            */}

        </div>

    )
}

export default Admin;