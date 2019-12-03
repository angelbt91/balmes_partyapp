import React, {useState} from 'react';
import '../bootstrap.min.css';
import './admin.css';
import Fab from '@material-ui/core/Fab';
import CachedIcon from '@material-ui/icons/Cached';
import MessagesTable from "./MessagesTable";

function Admin() {

    // useState para guardar los mensajes y triggear el re-render
    const [messagesArray, setMessagesArray] = useState(null);

    // para actualizar el state de mensaje
    const fetchMessages = async () => {

        const url = 'http://127.0.0.1/api/getmessages';

        const options = {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
            }),
            mode: 'cors'
        };

        return fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            })
            .then(response => {
                setMessagesArray(response);
                return response.status;
            })
            .catch(error => {
                return error.status;
            })

    };

    return (
        <div className="container">
            <div className="row justify-content-between mt-4">
                <h1>Admin panel</h1>
                <Fab onClick={fetchMessages} color="primary">
                    <CachedIcon/>
                </Fab>
            </div>
            <div className="row mt-3">
                { messagesArray === null
                    ? <p>Click on the button above to load the messages!</p>
                    : <MessagesTable props={messagesArray}/>
                }
            </div>
        </div>
    )
}
export default Admin;
