import React, {useState, useEffect} from 'react';
import '../bootstrap.min.css';
import './submit.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pusher from 'pusher-js';
import LinearProgress from '@material-ui/core/LinearProgress';

function Submit() {

    // cargamos el websocket para escuchar
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var pusher = new Pusher('5cc6a7b52b164fc3f417', {
            cluster: 'eu',
            forceTLS: false
        });

        var channel = pusher.subscribe('my-channel');

        channel.bind('my-event', function(data) {
            console.log("He recibido algo por websocket:\n" + JSON.stringify(data));
        });
    }, []);

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const data = {
        name: name,
        message: message,
        image: image
    };
    const toastOptions = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    };

    // metodo para leer la imagen
    const prepareUpload = async () => {

        // si no hay ni mensaje ni imagen, devolvemos error
        if (data['message'] === "" && data['image'] === "") {
            toast.warn('Please write a message, attach a photo... Or both!', toastOptions);
            setDisabled(false);
            return;
        }

        // si no hay imagen, saltamos directamente a enviar mensaje sin ella
        if (data.image === "") {
            uploadMessage();
            return;
        }

        // si hay imagen, convertimos el archivo a base64 con el filereader
        let reader = new FileReader();

        reader.onload = () => {
            data["image"] = reader.result;
            publishImage();
        };

        reader.onerror = () => {
            toast.error('Error reading the media. Please retry.', toastOptions);
            setDisabled(false);
        };

        reader.readAsDataURL(data["image"]);

    };


    // método para hacer el post de imagen a Cloudinary y recuperar la URL remota
    const publishImage = async () => {

        // bases para hacer el fetch
        const url = 'https://api.cloudinary.com/v1_1/themrangel/auto/upload';
        const imageData = {
            "file": data.image,
            "upload_preset": "iqxfcs3m"
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(imageData),
            headers: new Headers({
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin',
                'Access-Control-Allow-Origin': '*'
            }),
            mode: 'cors'
        };

        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    setDisabled(false);
                    return Promise.reject(response.status);
                }
            })
            .then(response => {
                data.image = response["eager"][0]["url"];
                uploadMessage();
            })
            .catch(error => {
                toast.error('Image could not be uploaded. Please retry.', toastOptions);
                setDisabled(false);
                console.log("Error al publicar imagen. Error número " + error.status + ". Contenido de la request: \n" + options.body);
                return Promise.reject(error.status);
            });
    };


    // y finalmente, subir el mensaje
    const uploadMessage = async () => {

        // subida del mensaje
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
                    toast.success('Message succesfully sent!', toastOptions);
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

                } else {
                    return Promise.reject(response.status);
                }
            }).catch(error => {
                toast.error('Message could not be sent. Please retry.', toastOptions);
                setDisabled(false);
                console.log("Error al subir el mensaje. Error número " + error.status + ".\n\n" + error.body);
            });
    };


    return (

        <div>
            {disabled ? <LinearProgress /> : null }
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
                    <h1
                        style={{width: "100%", textAlign: "center"}}
                        className="mt-4"
                    >Balmes' 2020</h1>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle/>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="nameField"
                                label="Your name (optional)"
                                inputProps={{maxLength: 25}}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}/>
                        </Grid>
                    </Grid>
                </div>
                <div className="row m-1">
                    <TextField
                        id="messageField"
                        label="Write here an epic message"
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
                </div>
                <div className="row m-1 mt-2">
                    <input
                        id="imageField"
                        type="file"
                        accept="image/*;capture=camera"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                        }}
                    />
                </div>
                <div className="row d-flex justify-content-center m-4 mt-5">
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon/>}
                        disabled={disabled}
                        style={{width: "100%"}}
                        size="large"
                        onClick={() => {
                            setDisabled(true);
                            prepareUpload();
                        }}>
                        Send to the TV
                    </Button>
                </div>
                <div className="row">
                    <div className="uploadtooltip fixed-bottom shadow-sm m-3 mt-5">
                        <strong>Pro tip:</strong> Spice up your photo or video with Instagram Stories' editor before uploading it here! 8 seconds max.
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Submit;