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
                message = addStoryType(message); // the storyType is added client-side atm
                setState(message);
                return setGetNextMessage(false);
            })
            .catch(error => {
                console.log("Error ", error);
                setGetNextMessage(false);
                return error;
            });
    }, [getNextMessage]);

    /***************** UTILITIES ********************/

    const addStoryType = (story) => {
        story.currentMessage.storyType = getStoryType(story.currentMessage);
        return story;
    }

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