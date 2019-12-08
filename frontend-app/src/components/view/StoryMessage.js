import React from 'react';

function StoryMessage(props) {

    let messageToShow = props.messageToShow;

    return (
        <div>
            <button
                onClick={props.ChooseNewMessage}
            >
                SIGUIENTE MENSAJE
            </button>);
            <p className="message">{messageToShow !== undefined ? messageToShow.message : null}</p>
        </div>
    )


}

export default StoryMessage;
