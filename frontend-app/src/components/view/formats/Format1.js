import React from 'react';
import '../../bootstrap.min.css'

export default function Format5(props) {

    if (!props) {
        console.log("Aún no hay props que pintar");
        return (null);
    }

    let message = props.message;

    return (
        <div className="container" style={{"height": "100%"}}>
            <div className="row d-flex justify-content-center flex-column" style={{"height": "100%"}}>
                <p>{message.name} {message.created_at}</p>
                <p style={{"fontSize": "48px"}}>{message.message}</p>
            </div>
        </div>

    )

}