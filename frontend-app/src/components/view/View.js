import React from 'react';
import '../bootstrap.min.css';
import './view.css';
import bgVideo from '../../resources/bgvideo01.mp4'
import StoryHandler from "./StoryHandler";

function View() {

    return (
        <div className="container-fluid canvas">
            <StoryHandler/>
            <video autoPlay muted loop id="bgVideo">
                <source src={bgVideo} type="video/mp4"/>
            </video>
        </div>
    )
}

export default View;