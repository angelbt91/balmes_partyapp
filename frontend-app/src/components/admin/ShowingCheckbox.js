import React, {useState, useEffect} from "react";
import Switch from '@material-ui/core/Switch';
import {toast} from 'react-toastify';

function ShowingCheckbox(props) {
    const [checked, setChecked] = useState(props.showing === 1);

    const toastOptions = {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    };

    const handleChange = event => {
        const url = "http://127.0.0.1/api/messages";
        const data = {
            "id": props.id,
            "showing": !checked
        };
        const options = {
            method: 'PUT',
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
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            }).then(response => {
                if (response.data.showing === 0) {
                    toast.success("El mensaje " + response.data.id + " ya no se mostrará.", toastOptions);
                } else {
                    toast.success("El mensaje " + response.data.id + " se mostrará a partir de ahora.", toastOptions);
                }
                setChecked(!checked);
            }).catch(error => {
                toast.error('Error al actualizar el status de showing: ' + error, toastOptions);
            });
    };

    return (
        <div>
            <Switch
                checked={checked}
                onChange={event => handleChange()}
                value="checkbox"
                color="primary"
                inputProps={{'aria-label': 'showing checkbox'}}
            />
        </div>
    )
}

export default ShowingCheckbox;