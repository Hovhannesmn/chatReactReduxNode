import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore} from 'redux'
import { Provider } from 'react-redux'
import ChatHOK from "./containers/ChatHOK";
import LoginHOK from "./containers/LoginHOK";
import connectReducer from './reducers/ConnectReducer';
import {
    BrowserRouter as Router,
    Route,
    // Link,
    Redirect,
    Switch,
} from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker'

const store = createStore(connectReducer);
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/message' component={ChatHOK} />
                <Route path='/login' component={LoginHOK} />
                <Route exact path='/' render={() => (
                    <Redirect
                        to='/message'
                    />
                )} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

