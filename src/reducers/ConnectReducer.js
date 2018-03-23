import  sendMessage from './SendMessage';
import {combineReducers } from 'redux'


const connectReducer =  combineReducers({
    messages: sendMessage
});

export default connectReducer;