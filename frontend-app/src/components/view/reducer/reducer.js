import {useReducer} from "react";
import get from "../../../helpers/fetchHelper";
/*
const initialState = {
    currentMessage: {
        name: "Loading messages...",
        message: "Loading messages...",
        storyType: 1
    },
    currentMessageIndex: -1,
    alreadySeenMessages: []
};

const MessageReducer = (state = initialState, action) => {

    let newState = {...state};
    const {type} = {...action};

    if (type === GET_NEXT_MESSAGE) {

        (async () => {
            const url = 'http://127.0.0.1/api/getmessages';

            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }),
                mode: 'cors'
            };

            newState = await fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                })
                .then(messages => {
                    if (allMessagesAreHidden(messages)) {
                        console.log("No hay ningún mensaje con showing === 1 en la array.");
                        return null;
                    }

                    messages = excludeHiddenMessages(messages);
                    let newMessage;

                    if (thereAreUnviewedMessages(messages, newState.alreadySeenMessages)) {
                        newMessage = getFirstUnviewedMessage(messages, newState.alreadySeenMessages);
                        newMessage.storyType = getStoryType(newMessage);

                        newState.currentMessage = newMessage;
                        newState.alreadySeenMessages.push(newState.currentMessage.id);

                        logMessage(newState, true);
                    } else {
                        newState.currentMessageIndex++;

                        if (newState.currentMessageIndex >= messages.length || newState.currentMessageIndex < 0) {
                            newState.currentMessageIndex = 0;
                        }

                        newMessage = messages[newState.currentMessageIndex];
                        newMessage.storyType = getStoryType(newMessage);

                        logMessage(newState, false);
                    }

                    newState.currentMessage = newMessage;
                    return newState;
                })
                .catch(error => {
                    console.log(error);
                    return error;
                });

        })()

    }

    return newState;

};

const allMessagesAreHidden = (messages) => {
    let messagesArray = messages;
    messagesArray = messagesArray.filter(message => message.showing === 1);
    return messagesArray.length === 0;
};

const excludeHiddenMessages = (messages) => {
    let messagesArray = [...messages];
    messagesArray = messagesArray.filter(message => message.showing === 1);

    return messagesArray;
};

const thereAreUnviewedMessages = (messages, alreadySeenMessages) => {
    let unviewedMessages = messages.filter(message => {
        for (let i = 0; i < alreadySeenMessages.length; i++) {
            if (message.id === alreadySeenMessages[i]) {
                return false;
            }
        }
        return true;
    });

    return unviewedMessages.length > 0;
};

const getFirstUnviewedMessage = (messages, alreadySeenMessages) => {
    let unviewedMessages = messages.filter(message => {
        for (let i = 0; i < alreadySeenMessages.length; i++) {
            if (message.id === alreadySeenMessages[i]) {
                return false;
            }
        }
        return true;
    });

    return unviewedMessages[0];
};

const getStoryType = (story) => {

    let storyType;

    if (story === undefined) {
        return 0;
    }

    if (!story.image) {
        storyType = 1; // solo mensaje
    } else {
        let image = document.createElement('img');
        image.src = story.image;

        if (image.naturalWidth > image.naturalHeight && !story.message) {
            storyType = 2; // más ancha que alta, sin mensaje
        } else if (image.naturalWidth <= image.naturalHeight && !story.message) {
            storyType = 3; // cuadrada o más alta que ancha, sin mensaje
        } else if (image.naturalWidth > image.naturalHeight && story.message != null) {
            storyType = 4; // más ancha que alta, sin mensaje
        } else if (image.naturalWidth <= image.naturalHeight && story.message != null) {
            storyType = 5; // // cuadrada o más alta que ancha, con mensaje
        } else {
            console.log("Por algún motivo, el mensaje a enseñar no encaja en ningún tipo de story.");
            storyType = undefined;
        }
    }

    return storyType;

};

const logMessage = (state, isNew) => {
    if (isNew) {
        console.log("%cMostramos un mensaje nuevo:", "font-weight: 900; background-color: green;");
    } else {
        console.log("%cMostramos un mensaje no nuevo:", "font-weight: 900; background-color: blue; color: white;");
    }
    console.log(state.currentMessage);
    console.log("Mensajes ya vistos:");
    console.log(state.alreadySeenMessages);
    console.log("Current index: " + state.currentMessageIndex);
};
 */
export const GET_NEXT_MESSAGE = 'GET_NEXT_MESSAGE';
/*
export const MsgReducer = () => useReducer(MessageReducer, initialState);
 */