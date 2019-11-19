import React, {useState} from 'react';
import './bootstrap.min.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {ToastContainer, toast} from 'react-toastify';
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

    // metodo para leer la imagen
    const uploadImage = async () => {
        // si no hay ni mensaje ni imagen, devolvemos error
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
            return;
        }

        // si no hay imagen, saltamos directamente a enviar mensaje
        if (data.image === "") {
            uploadMessage();
            return;
        }

        // si todo bien, cargamos el filereader
        let reader = new FileReader();

        reader.onload = () => {
            data["image"] = reader.result;
            console.log(data.image);
            publishImage();
        }

        reader.onerror = () => {
            toast.error('Error reading the image. Please retry.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

        reader.readAsDataURL(data["image"]);

    };

    // método para hacer el post de imagen
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
                'Access-Control-Allow-Headers': 'Content-Type',
            }),
            mode: 'cors'
        };

        // avisamos de que vamos a subir la imagen
        toast.info('Uploading image...', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

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
                toast.success('Image uploaded!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                data.image = response["eager"][0]["url"];
                uploadMessage();
            })
            .catch(error => {
                toast.error('Image could not be sent. Please retry.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                setDisabled(false);
                console.log("Error al publicar imagen. Error número " + error.status + ". Contenido de la request: \n" + options.body);
                return Promise.reject(error.status);
            });
    };


// subir mensaje
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

                } else {
                    return Promise.reject(response.status);
                }
            }).catch(error => {
                console.log("Error al subir el mensaje. Error número " + error.status + ".\n\n" + error.body);
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
                            uploadImage();
                        }}>
                        Send to the TV
                    </Button>
                </div>
                <input
                    id="imageField"
                    type="file"
                    accept="image/*;capture=camera"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                />
            </div>
        </div>
    );
}

export default Submit;