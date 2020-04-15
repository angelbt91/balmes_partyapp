import React from 'react';
import '../bootstrap.min.css';
import './view.css';
import bgVideo from '../../resources/bgvideo01.mp4'
import StoryHandler from "./StoryHandler";

function View() {

    return (
            <div className="container-fluid canvas">
                <div className="row h-100 w-100 justify-content-center align-items-center">
                    <div className="wrapper">
                        <StoryHandler/>
                        <video autoPlay muted loop id="bgVideo">
                            <source src={bgVideo} type="video/mp4"/>
                        </video>
                    </div>
                </div>
            </div>
    )
}

export default View;