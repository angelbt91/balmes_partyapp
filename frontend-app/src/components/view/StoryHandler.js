import React, {useEffect, useState} from 'react';
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

    const [state, setState] = useState(initialState);
    const [getNextMessage, setGetNextMessage] = useState(true);

    useEffect(() => {

        if (!getNextMessage)
            return;

        setGetNextMessage(false);

        const body = {
            "alreadySeenMessages": state.alreadySeenMessages,
            "currentMessageIndex": state.currentMessageIndex
        }

        const url = 'http://127.0.0.1/api/messages/next';

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type'
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
            .then(message => {
                setState(message);
                return setGetNextMessage(false);
            })
            .catch(error => {
                console.log("Error ", error);
                setGetNextMessage(false);
                return error;
            });

    }, [getNextMessage]);

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
                                    <Format5 ChooseNewMessage={() => {
                                        setGetNextMessage(true)
                                    }} message={state.currentMessage}/>
                                </>
                                :
                                <p>Cargando...</p>
            }
        </div>
    );

}

export default StoryHandler;