import React, {useState, useEffect} from 'react';
import Stories from 'react-insta-stories';
import '../bootstrap.min.css';
import './view.css';
import bgVideo from '../../resources/bgvideo01.mp4'
import get from "../../helpers/fetchHelper";

/*
- Recojo todos los mensajes en una array.

FILTRADO:
- OCULTAR LOS SHOWING NO: Primero, quito los que están en showing: no.

- COMPROBAR SI HAY NUEVOS Y COGER EL PRIMERO NUEVO: Luego, filtro la array de mensajes por su ID, con la array de IDs ya vistos.

Me quedo con el primero que quede. Añado su ID a la lista de IDs vistos.
- SI NO HAY NUEVOS: Si en el paso anterior no hay nuevos (la array se vacía), recojo la full array de mensajes
y me quedo el que su index coincida con la array de indexMessages. Sumo +1 a esa array.
 */

function View() {

    const [allMessagesArray, setAllMessagesArray] = useState([]);

    const updateAllMessagesArray = () => {
        get("http://127.0.0.1/api/getmessages").then((response) => {
            setAllMessagesArray(response);
        });
    };

    // effect to invoke updateAllMessagesArray recurrently at the first render
    useEffect(() => {
        setInterval(
            () => {
                get("http://127.0.0.1/api/getmessages")
                    .then((response) => {
                            setAllMessagesArray(response);
                        }
                    );
            }, 4000);
    }, []);


    return (
        <div className="container-fluid canvas">
                <video autoPlay muted loop id="bgVideo">
                    <source src={bgVideo} type="video/mp4" />
                </video>
            {/*<Stories
                stories={stories}
                defaultInterval={1500}
                width={432}
                height={768}
            />*/}
        </div>
    )
}

export default View;