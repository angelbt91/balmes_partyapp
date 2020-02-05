import React from 'react';
import Format5 from "./formats/Format5";

function StoryMessage(props) {

    /*
    1 = No imagen + sí mensaje
    2 = Sí imagen (horizontal) + no mensaje
    3 = Sí imagen (vertical) + no mensaje
    4 = Sí imagen (horizontal) + sí mensaje
    5 = Sí imagen (vertical) + sí mensaje
     */

    let messageToShow = props.messageToShow;


    return (
        <div>
            <button onClick={props.ChooseNewMessage}>Otro</button>
            {messageToShow.storyType === 1 ?
                <>
                    <p>Name: {messageToShow.name}</p>
                    <p>Message: {messageToShow.message}</p>
                </>
                :
                messageToShow.storyType === 2 ?
                    <>
                        <p>Name: {messageToShow.name}</p>
                        <p>Message: {messageToShow.message}</p>
                    </>
                    :
                    messageToShow.storyType === 3 ?
                        <>
                            <p>Name: {messageToShow.name}</p>
                            <p>Message: {messageToShow.message}</p>
                        </>
                        :
                        messageToShow.storyType === 4 ?
                            <>
                                <p>Name: {messageToShow.name}</p>
                                <p>Message: {messageToShow.message}</p>
                            </>
                            :
                            messageToShow.storyType === 5 ?
                                <>
                                    <Format5 ChooseNewMessage={props.ChooseNewMessage} msg={messageToShow}/>
                                </>
                                :
                                <p>Cargando...</p>
            }
        </div>
    )
}

export default StoryMessage;
