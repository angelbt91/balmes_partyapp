import React, {useState, useEffect} from 'react';
import './bootstrap.min.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Submit() {

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const [disabled, setDisabled] = useState(false);

    const data = {
        name: name,
        message: message,
        image: image
    };

    // TODO: deshabilitar el botón hasta que se haya efectuado el envio o fallado

    // método para hacer el post
    const fetchdata = async () => {

        if (data['message'] === "" && data['image'] === "") {
            toast.warn('Please write a message, attach a photo... Or both!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            setDisabled(false);
        } else {

            const url = 'http://127.0.0.1/api/postmessage';

            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }),
                mode: 'cors'
            };

            return fetch(url, options)
                .then(response => {
                    if (response.status === 200) {
                        console.log("Éxito. Status: " + response.status + ". Texto: " + response.statusText + ". Body:\n" + options['body']);
                        toast.success('Message succesfully sent!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                        setDisabled(false);

                        // vaciamos el nombre
                        const nameField = document.getElementById("nameField");
                        nameField.value = "";
                        setName("");

                        // vaciamos el mensaje
                        const messageField = document.getElementById("messageField");
                        messageField.value = "";
                        setMessage("");

                        // vaciamos la imagen
                        const imageField = document.getElementById("imageField");
                        imageField.value = "";
                        setImage("");

                        // TODO: Borrar los campos
                    } else {
                        console.log("Error " + response.status + ".\n\n" + response.body);
                        toast.error('Message could not be sent. Please retry.', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                        setDisabled(false);
                        return Promise.reject(response.status);
                    }
                }).catch(error => {
                    console.log("Error: " + error);
                    toast.error('Message could not be sent. Please retry.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    setDisabled(false);
                });

        }
    };


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

            <div className="row m-1">
                <h1>Balmes' New Year's Party Message-to-TV App</h1>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle/>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="nameField"
                            label="Write here your name"
                            inputProps={{maxLength: 25}}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}/>
                    </Grid>
                </Grid>
                <TextField
                    id="messageField"
                    label="Write here some epic shit"
                    inputProps={{maxLength: 130}}
                    fullWidth
                    multiline
                    rows="4"
                    defaultValue=""
                    margin="normal"
                    variant="outlined"
                    className="mt-4"
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                />
                <div className="d-flex justify-content-end w-100 mt-2">
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon/>}
                        disabled={disabled}
                        onClick={() => {
                            setDisabled(true);
                            fetchdata();
                        }}>
                        Send to the TV
                    </Button>
                </div>
                <input
                    id="imageField"
                    type="file"
                    accept="image/*;capture=camera"
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                />
            </div>
        </div>
    );
}

export default Submit;