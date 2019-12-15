import React from 'react';

function StoryMessage(props) {

    /*
    1 = No imagen + sí mensaje
    2 = Sí imagen (horizontal) + no mensaje
    3 = Sí imagen (vertical) + no mensaje
    4 = Sí imagen (horizontal) + sí mensaje
    5 = Sí imagen (vertical) + sí mensaje
     */

    let messageData = props.messageToShow;
    let storyType;

    // caso 1: no hay imagen
    if (!messageData.image) {
        storyType = 1;
    } else {
        // casos con imagen
        let image = document.createElement('img');
        image.src = messageData.image;

        if (image.naturalWidth > image.naturalHeight && !messageData.message) {
            storyType = 2;
        } else if (image.naturalWidth <= image.naturalHeight && !messageData.message) {
            storyType = 3;
        } else if (image.naturalWidth > image.naturalHeight && messageData.message != null) {
            storyType = 4;
        } else if (image.naturalWidth <= image.naturalHeight && messageData.message != null) {
            storyType = 5;
        } else {
            console.log("Por algún motivo, el mensaje a enseñar no encaja en ningún tipo de story.");
        }
    }

    return (
        <div>
            <button onClick={props.ChooseNewMessage}>Otro</button>
            {storyType === 1 ?
                <>
                    <p>Name: {props.messageToShow.name}</p>
                    <p>Message: {props.messageToShow.message}</p>
                </>
                :
                storyType === 2 ?
                    <>
                        <p>Name: {props.messageToShow.name}</p>
                        <p>Message: {props.messageToShow.message}</p>
                    </>
                    :
                    storyType === 3 ?
                        <>
                            <p>Name: {props.messageToShow.name}</p>
                            <p>Message: {props.messageToShow.message}</p>
                        </>
                        :
                        storyType === 4 ?
                            <>
                                <p>Name: {props.messageToShow.name}</p>
                                <p>Message: {props.messageToShow.message}</p>
                            </>
                            :
                            <>
                                <p>Name: {props.messageToShow.name}</p>
                                <p>Message: {props.messageToShow.message}</p>
                            </>
            }
        </div>
    )
}

export default StoryMessage;
