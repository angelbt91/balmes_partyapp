import React, {useState, useEffect} from "react";
import Switch from '@material-ui/core/Switch';
import {toast} from 'react-toastify';

function ShowingCheckbox(props) {

    // solo para convertir 1 y 0 a false y true y usarlo en variable de estado
    let isShowing = (props.showing === 1);
    const [checked, setChecked] = useState(isShowing);

    // useState para evitar enviar UPDATES en el primer renderizado
    const [firstRender, setFirstRender] = useState(0);

    // useEffect para enviar UPDATES al actualizar el showing
    useEffect(() => {
        if (firstRender !== 0) {

            // auto-invoked function
            (async function ()  {

                const url = "http://127.0.0.1/api/updatemessage";
                const data = {
                    "id": props.id,
                    "showing": checked
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

                return fetch(url, options).then(response => {
                    if (response.status >= 200 && response.status < 400) {
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
                }).catch(error => {
                    toast.error('Error al actualizar el status de showing: ' + error, toastOptions);
                });

            })();

        } else {
            setFirstRender(1);
        }

    }, [checked]);

    // para los toasts
    const toastOptions = {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    };

    // para cambiar el switch
    const handleChange = name => event => {
        setChecked(!checked);
    };

    return (
        <div>
            <Switch
                checked={checked}
                onChange={handleChange('checkbox')}
                value="checkbox"
                color="primary"
                inputProps={{ 'aria-label': 'showing checkbox' }}
            />
        </div>

    )
}

export default ShowingCheckbox;