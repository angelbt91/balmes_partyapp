import React from 'react';

function MessageMedia(props) {
    return (
        <a href={props.props} target="_blank">
            <img
                src={props.props}
                height="40px"
            />
        </a>
    )
}

export default MessageMedia;