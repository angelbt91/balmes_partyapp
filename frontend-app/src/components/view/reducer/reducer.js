import {useReducer} from "react";
import get from "../../../helpers/fetchHelper";

const initialState = {
    messages: null,
    messagesAlreadySeen: [],
    currentMessageIndex: -1
};

const MessageReducer = (state = initialState, action) => {

    let newState = {...state};
    const {type} = {...action};

    if (type === FETCH_ALL_MESSAGES) {
        get("http://127.0.0.1/api/getmessages")
            .then((response) => {
                    newState.messages = response;
                    return newState;
                }
            );
    }

    if (type === ADD_MSG_ALREADY_SEEN) {
        newState.messagesAlreadySeen.push(action.message);
    }

    if (type === SET_CURRENT_MSG_INDEX) {
        newState.currentMessageIndex = action.currentMessageIndex;
    }

    return newState;

};

export const FETCH_ALL_MESSAGES = 'FETCH_ALL_MESSAGES';
export const ADD_MSG_ALREADY_SEEN = 'ADD_MSG_ALREADY_SEEN';
export const SET_CURRENT_MSG_INDEX = 'SET_CURRENT_MSG_INDEX';
export const MsgReducer = () => useReducer(MessageReducer, initialState);