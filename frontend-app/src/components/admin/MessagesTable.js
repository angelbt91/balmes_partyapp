import React from 'react';
import ShowingCheckbox from "./ShowingCheckbox";
import MessageMedia from "./MessageMedia";
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

function MessagesTable(props) {
    const messages = props.messages;

    const rows = messages.map((row, index) => {
        return (
            <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
                <TableCell align="right">{row.updated_at}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.message}</TableCell>
                <TableCell align="right"><MessageMedia url={row.image}/></TableCell>
                <TableCell align="right">
                    <ShowingCheckbox id={row.id} showing={row.showing}/>
                </TableCell>
            </TableRow>
        )
    });

    return (
        <Paper className="messagetable">
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Created at</TableCell>
                        <TableCell align="right">Last updated</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Message</TableCell>
                        <TableCell align="right">Media</TableCell>
                        <TableCell align="right">Showing</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default MessagesTable;