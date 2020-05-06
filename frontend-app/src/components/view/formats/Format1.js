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
            <div className="row" style={{"height": "100%"}}>
                <p>{message.name} {message.created_at}</p>
                <div className="col d-flex align-items-center justify-content-center" style={{"height": "8  0%"}}>
                    <p style={{"fontSize": "48px"}}>{message.message}</p>
                </div>
            </div>
        </div>

    )

}