import React from 'react';
import Stories from 'react-insta-stories';
import '../../bootstrap.min.css'

export default function Format5(props) {

    if (!props) {
        console.log("Aún no hay props que pintar");
        return (null);
    }

    let message = props.message;

    const stories = [{
        header: {
            heading: message.name,
            subheading: message.created_at,
            profileImage: 'https://picsum.photos/1080/1920'
        },
        url: message.image
    }];

    return (
        <div className="container" style={{"height": "100%"}}>
            <div className="row d-flex align-items-center"  style={{"height": "80%"}}>
                <div className="col">
                    <Stories
                        stories={stories}
                        defaultInterval={4000}
                        width={850}
                        height={478}
                        onStoryEnd={props.ChooseNewMessage}
                    />
                </div>
            </div>
        </div>

    )

}