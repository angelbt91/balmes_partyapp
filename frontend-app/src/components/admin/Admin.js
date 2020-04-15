import React, {useState, useEffect} from 'react';
import '../bootstrap.min.css';
import './admin.css';
import Fab from '@material-ui/core/Fab';
import CachedIcon from '@material-ui/icons/Cached';
import MessagesTable from "./MessagesTable";
import {ToastContainer} from "react-toastify";
import get from "../../helpers/fetchHelper";

function Admin() {

    // useState para guardar los mensajes y triggear el re-render
    const [messagesArray, setMessagesArray] = useState(undefined);

    // para actualizar el state de mensaje
    const fetchMessages = () => {

        get("http://127.0.0.1/api/getmessages").then((response) => {
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
                { typeof (messagesArray) === undefined
                    ? <p>Click on the button above to load the messages!</p>
                    : <MessagesTable props={messagesArray}/>
                }
            </div>
        </div>
    )
}
export default Admin;
