import React, {useEffect, useContext} from 'react';
import {MsgContext} from "./reducer/context";
import {GET_NEXT_MESSAGE} from "./reducer/reducer";
import Format5 from "./formats/Format5";

function StoryHandler() {

    const {state, dispatch} = useContext(MsgContext);
    const message = state.currentMessage;

    useEffect(() => {
        dispatch({type: GET_NEXT_MESSAGE}); // to start showing the first message
    }, [dispatch]);

    function ChooseNextMessage() {
        dispatch({type: GET_NEXT_MESSAGE});
    }

    return (
        <div>
            <button onClick={e => ChooseNextMessage()}>Otro</button>
            {message.storyType === 1 ?
                <>
                    <p>Name: {message.name}</p>
                    <p>Message: {message.message}</p>
                </>
                :
                message.storyType === 2 ?
                    <>
                        <p>Name: {message.name}</p>
                        <p>Message: {message.message}</p>
                    </>
                    :
                    message.storyType === 3 ?
                        <>
                            <p>Name: {message.name}</p>
                            <p>Message: {message.message}</p>
                        </>
                        :
                        message.storyType === 4 ?
                            <>
                                <p>Name: {message.name}</p>
                                <p>Message: {message.message}</p>
                            </>
                            :
                            message.storyType === 5 ?
                                <>
                                    <Format5 ChooseNewMessage={ChooseNextMessage} message={message}/>
                                </>
                                :
                                <p>Cargando...</p>
            }
        </div>
    );

}

export default StoryHandler;