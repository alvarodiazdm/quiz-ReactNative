import { Provider } from 'react-redux';
import GlobalState from './reducers';
import { createStore } from 'redux';

import React from 'react';
import GameScreen from '../components/GameScreen';

export default class ReduxProvider extends React.Component{
    constructor(props){
        super(props);
        this.initialState = {
            score: 0,
            finished: false,
            currentQuestion: 0,
            questions: [ ]
        };
        this.store = this.configureStore();
    }
    render(){
        return (
            <Provider store = {this.store}>
                <GameScreen/>
            </Provider>
        );
    }
    configureStore(){
        return createStore(GlobalState, this.initialState);
    }
}