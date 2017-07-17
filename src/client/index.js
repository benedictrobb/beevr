import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import homeReducer from './reducers/index.js';
import LoginPage from './components/pages/LoginPage.js';
import RegisterPage from './components/pages/RegisterPage.js';
import Dashboard from './components/pages/Dashboard.js';
import NotFound from './components/pages/NotFound.js';
import App from './components/app.js';
import BrowseJobs from './components/pages/SearchJobs.js';
import BrowseStudents from './components/pages/SearchStudents.js';
import RegisterResident from './components/pages/RegisterResident';
import PostJob from './components/pages/PostJob';

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const store = createStore(homeReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//const store = createStoreWithMiddleware(homeReducer);

console.log(store);

function checkAuth(nextState, replaceState) {
    let {loggedIn} = store.getState();

    // check if the path isn't dashboard
    // that way we can apply specific logic
    // to display/render the path we want to
    if (nextState.location.pathname !== '/') {
        if (loggedIn) {
            if (nextState.location.state && nextState.location.pathname) {
                replaceState(null, nextState.location.pathname);
            } else {
                replaceState(null, '/');
            }
        }
    } else {
        // If the user is already logged in, forward them to the homepage
        if (!loggedIn) {
            if (nextState.location.state && nextState.location.pathname) {
                replaceState(null, nextState.location.pathname);
            } else {
                replaceState(null, '/');
            }
        }
    }
}

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route component={App}>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/registerresident" component={RegisterResident} />
                <Route path="/browsejobs" component={BrowseJobs} />
                <Route path="/browsestudents" component={BrowseStudents} />
                <Route path="/postjob" component={PostJob} />
                <Route path="/" component={Dashboard} />
                <Route onEnter={checkAuth} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>,
    document.querySelector('.container')
);
