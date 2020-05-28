import React from 'react';

function MessageMedia(props) {
    return (
        <div>
            {
                props.url === null ?
                    null :
                    <a href={props.url} target="_blank" rel="noopener noreferrer">
                        <img src={props.url} height="40px" alt=""/>
                    </a>
            }
        </div>
    )
}

export default MessageMedia;