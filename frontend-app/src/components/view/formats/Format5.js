import React from 'react';
import Stories from 'react-insta-stories';

export default function Format5(props) {

    if (!props) {
        console.log("Aún no hay props que pintar");
        return (null);
    }

    let message = props.message;
    let style = `background-image: url("${message.image}");`;

    const stories = [{
        content: () => {
            return (
                <div className="format5" style={{backgroundImage: `url(${message.image})`}}>
                    <h2>{message.message}</h2>
                </div>
            );
        },
        url: message.image,
        header: {
            heading: message.name,
            subheading: message.created_at,
            profileImage: 'https://picsum.photos/1080/1920'
        }
    }];

    return (
        <Stories
            stories={stories}
            defaultInterval={6000}
            width={478}
            height={850}
            onStoryEnd={props.ChooseNewMessage}
        />
    )

}