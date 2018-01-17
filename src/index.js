import React from 'react';
import ReactDOM from 'react-dom';

import Web3Instance from './web3';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AccountList } from './components/account/AccountList';
import { Contract } from './components/contract/Contract';
import { GameRoom } from './components/room/GameRoom';

const web3 = Web3Instance.web3;

const RouteWithProps = ({ path, exact, strict, component:Component, location, ...rest }) => (
    <Route
        path={path}
        exact={exact}
        strict={strict}
        location={location}
        render={(props) => <Component {...props} {...rest} />}
    />
);

ReactDOM.render(
    <BrowserRouter>
        <App>
            <RouteWithProps exact path="/" component={AccountList} web3={web3}/>
            <RouteWithProps path="/contract" component={Contract} web3={web3}/>
            <RouteWithProps path="/room" component={GameRoom} web3={web3}/>
            <RouteWithProps path="/game" component={Contract} web3={web3}/>
        </App>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();


