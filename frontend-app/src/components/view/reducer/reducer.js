import {useReducer} from "react";
import get from "../../../helpers/fetchHelper";

const initialState = {
    messages: null,
    messagesAlreadySeen: [],
    currentMessageIndex: -1,
    currentMessageToShow: {}
};

const MessageReducer = (state = initialState, action) => {

    let newState = {...state};
    const {type} = {...action};

    if (type === GET_NEXT_MESSAGE) {
        get("http://127.0.0.1/api/getmessages")
            .then((response) => {

                // PASO 1: Si no hay mensajes en la array de mensajes, abandonamos
                if (response === null) {
                    console.log("No hay mensajes en la array.");
                    return;
                } else {
                    newState.messages = response;
                }

                // PASO 2.1: Filtramos los que no deban mostrarse
                let messagesFiltered = [...newState.messages];
                messagesFiltered = messagesFiltered.filter(message => message.showing === 1);

                // PASO 2.2: Si no queda ningun mensaje tras filtrarlos, abandonamos
                if (messagesFiltered.length < 1) {
                    console.log("No hay ningún mensaje con showing === 1 en la array.");
                    return;
                }

                // PASO 3.1: Por si hay mensajes nuevos que nunca se mostraron, primero quitamos los que ya hayamos visto
                let isThereANewMessage = messagesFiltered.filter(message => {
                    for (let i = 0; i < newState.messagesAlreadySeen.length; i++) {
                        if (message.id === newState.messagesAlreadySeen[i]) {
                            return false;
                        }
                    }
                    return true;
                });

                let storyType;

                // PASO 3.2: If isThereANewMessage, lo añadimos a la lista de mensajes vistos, y lo devolvemos para visualizarlo
                if (isThereANewMessage.length > 0) {
                    newState.messagesAlreadySeen.push(isThereANewMessage[0].id);
                    storyType = getStoryType(isThereANewMessage[0]);
                    isThereANewMessage[0].storyType = storyType;
                    console.log("%cMostramos un mensaje nuevo:", "font-weight: 900; background-color: green;");
                    console.log(isThereANewMessage[0]);
                    console.log("Mensajes ya vistos:");
                    console.log(newState.messagesAlreadySeen);
                    console.log("Current index: " + newState.currentMessageIndex);
                    newState.currentMessageToShow = isThereANewMessage[0];
                    return;
                }

                // PASO 4.1: Si no hay mensajes nuevos, asignamos el mensaje a mostrar en función del índice.
                let currentIndex; // variable local para evitar problemas con los ciclos de vida

                // Si no hay más mensajes en la array, damos la vuelta y volveremos a comenzar en el siguiente loop.
                if (newState.currentMessageIndex + 1 >= messagesFiltered.length || newState.currentMessageIndex < 0) {
                    currentIndex = 0;
                    newState.currentMessageIndex = currentIndex;
                } else {
                    currentIndex = newState.currentMessageIndex + 1;
                    newState.currentMessageIndex = currentIndex;
                }

                // PASO 4.2: Le añadimos el storyType y lo enviamos
                storyType = getStoryType(messagesFiltered[currentIndex]);
                messagesFiltered[currentIndex].storyType = storyType;
                console.log("%cMostramos un mensaje no nuevo:", "font-weight: 900; background-color: blue; color: white;");
                console.log(messagesFiltered[currentIndex]);
                console.log("Mensajes ya vistos:");
                console.log(state.messagesAlreadySeen);
                console.log("Current index: " + currentIndex);
                newState.currentMessageToShow = messagesFiltered[currentIndex];

            });

    }

    return newState;

};

const getStoryType = (story) => {

    let storyType;

    if (!story.image) {
        storyType = 1;
    } else {
        let image = document.createElement('img');
        image.src = story.image;

        if (image.naturalWidth > image.naturalHeight && !story.message) {
            storyType = 2;
        } else if (image.naturalWidth <= image.naturalHeight && !story.message) {
            storyType = 3;
        } else if (image.naturalWidth > image.naturalHeight && story.message != null) {
            storyType = 4;
        } else if (image.naturalWidth <= image.naturalHeight && story.message != null) {
            storyType = 5;
        } else {
            console.log("Por algún motivo, el mensaje a enseñar no encaja en ningún tipo de story.");
            storyType = undefined;
        }
    }

    return storyType;

};

export const GET_NEXT_MESSAGE = 'GET_NEXT_MESSAGE';
export const MsgReducer = () => useReducer(MessageReducer, initialState);