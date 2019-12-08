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

    return (
        <div>
            <button
                onClick={props.ChooseNewMessage}
            >
                SIGUIENTE MENSAJE
            </button>
            <p>{messageData.message}</p>
            <img src={messageData.image} width="150px" alt=""/>
        </div>
    )
}

export default StoryMessage;
