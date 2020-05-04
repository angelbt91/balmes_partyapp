import React, {useState, useEffect} from 'react';
import '../bootstrap.min.css';
import './admin.css';
import Fab from '@material-ui/core/Fab';
import CachedIcon from '@material-ui/icons/Cached';
import MessagesTable from "./MessagesTable";
import {ToastContainer} from "react-toastify";

function Admin() {

    const [messagesArray, setMessagesArray] = useState([]);

    const fetchMessages = () => {

        const url = 'http://127.0.0.1/api/messages';
        const options = {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
            }),
            mode: 'cors'
        };

        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            }).then((response) => {
                setMessagesArray(response);
        });

    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="container">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange={false}
                draggable
                pauseOnHover
            />
            <div className="row justify-content-between mt-4">
                <h1>Admin panel</h1>
                <Fab onClick={fetchMessages} color="primary">
                    <CachedIcon/>
                </Fab>
            </div>
            <div className="row mt-3">
                { messagesArray === []
                    ? <p>Click on the button above to load the messages!</p>
                    : <MessagesTable props={messagesArray}/>
                }
            </div>
        </div>
    )
}
export default Admin;
