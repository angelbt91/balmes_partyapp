import React, {useEffect, useState, useReducer} from 'react';
import {GET_NEXT_MESSAGE} from "./reducer/reducer";
import Format5 from "./formats/Format5";

function StoryHandler() {

    const initialState = {
        currentMessage: {
            name: "Loading messages...",
            message: "Loading messages...",
            storyType: 1
        },
        currentMessageIndex: -1,
        alreadySeenMessages: []
    };

    const MessageReducer = (state, action) => {
        let newState = {...state};
        const {type} = {...action};

        if (type === GET_NEXT_MESSAGE) {
            newState = action.state;
        }

        return newState;
    };

    const [state, dispatch] = useReducer(MessageReducer, initialState);

    const [isFetching, setIsFetching] = useState(false);
    const [getNextMessage, setGetNextMessage] = useState(true);

    useEffect(() => {

        if (!getNextMessage)
            return;

        setGetNextMessage(false);

        if (isFetching)
            return;

        setIsFetching(true);

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

        fetch(url, options)
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

                let newState = state;

                if (thereAreUnviewedMessages(messages, newState.alreadySeenMessages)) {
                    newState.currentMessage = getFirstUnviewedMessage(messages, newState.alreadySeenMessages);
                    newState.currentMessage.storyType = getStoryType(newState.currentMessage);

                    newState.alreadySeenMessages.push(newState.currentMessage.id);

                    logMessage(newState, true);
                } else {
                    newState.currentMessageIndex++;

                    if (newState.currentMessageIndex >= messages.length || newState.currentMessageIndex < 0) {
                        newState.currentMessageIndex = 0;
                    }

                    newState.currentMessage = messages[newState.currentMessageIndex];
                    newState.currentMessage.storyType = getStoryType(newState.currentMessage);

                    logMessage(newState, false);
                }

                dispatch({"state": newState, "type": GET_NEXT_MESSAGE});
                setIsFetching(false);
                return newState;
            })
            .catch(error => {
                console.log("Error ", error);
                setIsFetching(false);
                return error;
            });
    }, [getNextMessage]);

    /***************** UTILITIES ********************/

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
            storyType = undefined;
            return storyType;
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

    const getAnotherMessage = () => {
        setGetNextMessage(true);
    }

    /***************** UTILITIES ********************/

    return (
        <div>
            <button onClick={e => setGetNextMessage(true)}>Otro</button>
            {state.currentMessage.storyType === 1 ?
                <>
                    <p>Name: {state.currentMessage.name}</p>
                    <p>Message: {state.currentMessage.message}</p>
                </>
                :
                initialState.currentMessage.storyType === 2 ?
                    <>
                        <p>Name: {state.currentMessage.name}</p>
                        <p>Message: {state.currentMessage.message}</p>
                    </>
                    :
                    state.currentMessage.storyType === 3 ?
                        <>
                            <p>Name: {state.currentMessage.name}</p>
                            <p>Message: {state.currentMessage.message}</p>
                        </>
                        :
                        state.currentMessage.storyType === 4 ?
                            <>
                                <p>Name: {state.currentMessage.name}</p>
                                <p>Message: {state.currentMessage.message}</p>
                            </>
                            :
                            state.currentMessage.storyType === 5 ?
                                <>
                                    <Format5 ChooseNewMessage={() => {setGetNextMessage(true)}} message={state.currentMessage}/>
                                </>
                                :
                                <p>Cargando...</p>
            }
        </div>
    );

}

export default StoryHandler;