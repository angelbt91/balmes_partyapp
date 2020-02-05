import React from 'react';
import '../bootstrap.min.css';
import './view.css';
import bgVideo from '../../resources/bgvideo01.mp4'
import StoryHandler from "./StoryHandler";
import {MsgContext} from '../view/reducer/context'
import {MsgReducer} from "./reducer/reducer";

function View() {

    // recogemos el reducer, para luego pasarlo a los componentes que requieran sus datos a través de context
    const [state, dispatch] = MsgReducer();

    return (
        <MsgContext.Provider value={{state, dispatch}}>
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
        </MsgContext.Provider>
    )
}

export default View;