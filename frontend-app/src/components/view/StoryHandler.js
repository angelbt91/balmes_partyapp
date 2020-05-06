import React, {useEffect, useState} from 'react';
import Format1 from "./formats/Format1";
import Format2 from "./formats/Format2";
import Format3 from "./formats/Format3";
import Format4 from "./formats/Format4";
import Format5 from "./formats/Format5";

function StoryHandler() {

    const initialState = {
        currentMessage: {
            name: "Loading messages...",
            message: "Loading messages...",
            storyType: 0
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

                // hack to loop over a storyType of 1
                // todo: look for a more elegant solution
                if (message.currentMessage.storyType === 1) {
                    return setTimeout(() => {
                        console.log("Ejecutamos");
                        setGetNextMessage(true);
                    }, 6000);
                }

                return setGetNextMessage(false);

            })
            .catch(error => {
                console.log("Error ", error);
                setGetNextMessage(false);
                return error;
            });

    }, [getNextMessage]);

    return (
        <div style={{"height": "100%"}}>
            <button onClick={e => setGetNextMessage(true)}>Otro</button>
            {state.currentMessage.storyType === 1 ?
                <Format1 ChooseNewMessage={() => {
                    setGetNextMessage(true)
                }} message={state.currentMessage}/>
                :
                state.currentMessage.storyType === 2 ?
                    <Format2 ChooseNewMessage={() => {
                        setGetNextMessage(true)
                    }} message={state.currentMessage}/>
                    :
                    state.currentMessage.storyType === 3 ?
                        <Format3 ChooseNewMessage={() => {
                            setGetNextMessage(true)
                        }} message={state.currentMessage}/>
                        :
                        state.currentMessage.storyType === 4 ?
                            <Format4 ChooseNewMessage={() => {
                                setGetNextMessage(true)
                            }} message={state.currentMessage}/>
                            :
                            state.currentMessage.storyType === 5 ?
                                <Format5 ChooseNewMessage={() => {
                                    setGetNextMessage(true)
                                }} message={state.currentMessage}/>
                                :
                                <p>Cargando...</p>
            }
        </div>
    );

}

export default StoryHandler;