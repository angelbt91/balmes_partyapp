import React, {useState, useEffect} from 'react';
import get from "../../helpers/fetchHelper";
import StoryMessage from "./StoryMessage";

function StoryHandler() {

    const [allMessagesArray, setAllMessagesArray] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [messagesAlreadySeen, setMessagesAlreadySeen] = useState([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
    const [messageToShow, setMessageToShow] = useState({});

    // effect to update allMessagesArray each 4 seconds
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


    // effect to send the first message
    useEffect(() => {
        if (isFirstRender && allMessagesArray.length > 0) {
            setIsFirstRender(false);
            ChooseNewMessage();
        }
    }, [allMessagesArray]);


    // logica para escoger otro mensaje
    const ChooseNewMessage = () => {

        // PASO 1: Si no hay mensajes en la array de mensajes, abandonamos
        if (allMessagesArray.length < 1) {
            console.log("No hay mensajes en la array.");
            return;
        }

        // PASO 2.1: Filtramos los que no deban mostrarse
        let messagesFiltered;
        messagesFiltered = allMessagesArray.filter(message => message.showing === 1);

        // PASO 2.2: Si no queda ningun mensaje tras filtrarlos, abandonamos
        if (messagesFiltered.length < 1) {
            console.log("No hay ningún mensaje con showing === 1 en la array.");
            return;
        }

        // PASO 3.1: Por si hay mensajes nuevos que nunca se mostraron, primero quitamos los que ya hayamos visto
        let isThereANewMessage = messagesFiltered.filter(message => {
            for (let i = 0; i < messagesAlreadySeen.length; i++) {
                if (message.id === messagesAlreadySeen[i]) {
                    return false;
                }
            }
            return true;
        });

        // PASO 3.2: If isThereANewMessage, lo añadimos a la lista de mensajes vistos, y lo devolvemos para visualizarlo
        if (isThereANewMessage.length > 0) {
            messagesAlreadySeen.push(isThereANewMessage[0].id);
            console.log("%cMostramos un mensaje nuevo:", "font-weight: 900; background-color: green;");
            console.log(isThereANewMessage[0]);
            console.log("Mensajes ya vistos:");
            console.log(messagesAlreadySeen);
            console.log("Current index: " + currentMessageIndex);
            return setMessageToShow(isThereANewMessage[0]);
        }

        // PASO 4.1: Si no hay mensajes nuevos, asignamos el mensaje a mostrar en función del índice.
        let currentIndex; // variable local para evitar problemas con los ciclos de vida

        // Si no hay más mensajes en la array, damos la vuelta y volveremos a comenzar en el siguiente loop.
        if (currentMessageIndex + 1 >= messagesFiltered.length || currentMessageIndex < 0) {
            currentIndex = 0;
            setCurrentMessageIndex(currentIndex);
        } else {
            currentIndex = currentMessageIndex + 1;
            setCurrentMessageIndex(currentIndex);
        }

        // PASO 4.2: Lo enviamos
        console.log("%cMostramos un mensaje no nuevo:", "font-weight: 900; background-color: blue; color: white;");
        console.log(messagesFiltered[currentIndex]);
        console.log("Mensajes ya vistos:");
        console.log(messagesAlreadySeen);
        console.log("Current index: " + currentIndex);
        return setMessageToShow(messagesFiltered[currentIndex]);
    };

    return (
        <div>
            <StoryMessage ChooseNewMessage={ChooseNewMessage} messageToShow={messageToShow}/>
        </div>


    );

}

export default StoryHandler;