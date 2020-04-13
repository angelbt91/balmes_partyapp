import React from 'react';
import Stories from 'react-insta-stories';

export default function Format5(props) {

    if (!props) {
        console.log("Aún no hay props que pintar");
        return (null);
    }

    let msg = props.msg;

    const stories = [{
        url: msg.image,
        header: {
            heading: msg.name,
            subheading: msg.created_at,
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