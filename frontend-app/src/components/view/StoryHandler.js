import React, {useState, useEffect, useContext} from 'react';
import StoryMessage from "./StoryMessage";
import {MsgContext} from "./reducer/context";
import {FETCH_ALL_MESSAGES, ADD_MSG_ALREADY_SEEN, SET_CURRENT_MSG_INDEX} from "./reducer/reducer";

function StoryHandler() {

    const [messageToShow, setMessageToShow] = useState({});

    const {state, dispatch} = useContext(MsgContext);

    // effect to fetchMessages each 3 seconds
    useEffect(() => {
        const intervalId = setInterval(
            () => {
                dispatch({type: FETCH_ALL_MESSAGES});
            }, 3000);

        // cleanup
        return () => {
            clearInterval(intervalId);
            console.log("Cleaning up");
        }
    }, [dispatch]);

    // effect con state.messages de dependencia para asegurarnos que re-renderizamos cuando hay nuevos mensajes
    useEffect(() => {
        ChooseNewMessage();
    }, [state.messages]);

    // logica para escoger otro mensaje
    const ChooseNewMessage = () => {

        // PASO 1: Si no hay mensajes en la array de mensajes, abandonamos
        if (state.messages === null) {
            console.log("No hay mensajes en la array.");
            return;
        }

        // PASO 2.1: Filtramos los que no deban mostrarse
        let messagesFiltered = [...state.messages];
        messagesFiltered = messagesFiltered.filter(message => message.showing === 1);

        // PASO 2.2: Si no queda ningun mensaje tras filtrarlos, abandonamos
        if (messagesFiltered.length < 1) {
            console.log("No hay ningún mensaje con showing === 1 en la array.");
            return;
        }

        // PASO 3.1: Por si hay mensajes nuevos que nunca se mostraron, primero quitamos los que ya hayamos visto
        let isThereANewMessage = messagesFiltered.filter(message => {
            for (let i = 0; i < state.messagesAlreadySeen.length; i++) {
                if (message.id === state.messagesAlreadySeen[i]) {
                    return false;
                }
            }
            return true;
        });

        // PASO 3.2: If isThereANewMessage, lo añadimos a la lista de mensajes vistos, y lo devolvemos para visualizarlo
        if (isThereANewMessage.length > 0) {
            dispatch({type: ADD_MSG_ALREADY_SEEN, message: isThereANewMessage[0].id});
            console.log("%cMostramos un mensaje nuevo:", "font-weight: 900; background-color: green;");
            console.log(isThereANewMessage[0]);
            console.log("Mensajes ya vistos:");
            console.log(state.messagesAlreadySeen);
            console.log("Current index: " + state.currentMessageIndex);
            return setMessageToShow(isThereANewMessage[0]);
        }

        // PASO 4.1: Si no hay mensajes nuevos, asignamos el mensaje a mostrar en función del índice.
        // TODO mover este push al dispatch
        let currentIndex; // variable local para evitar problemas con los ciclos de vida

        // Si no hay más mensajes en la array, damos la vuelta y volveremos a comenzar en el siguiente loop.
        if (state.currentMessageIndex + 1 >= messagesFiltered.length || state.currentMessageIndex < 0) {
            currentIndex = 0;
            dispatch({type: SET_CURRENT_MSG_INDEX, currentMessageIndex: currentIndex});
            //setCurrentMessageIndex(currentIndex);
        } else {
            currentIndex = state.currentMessageIndex + 1;
            dispatch({type: SET_CURRENT_MSG_INDEX, currentMessageIndex: currentIndex});
            //setCurrentMessageIndex(currentIndex);
        }

        // PASO 4.2: Lo enviamos
        console.log("%cMostramos un mensaje no nuevo:", "font-weight: 900; background-color: blue; color: white;");
        console.log(messagesFiltered[currentIndex]);
        console.log("Mensajes ya vistos:");
        console.log(state.messagesAlreadySeen);
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