//import React from 'react';
//import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';

//ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import homeReducer from './client/reducers/index.js';
import LoginPage from './client/components/pages/LoginPage.js';
import RegisterPage from './client/components/pages/RegisterPage.js';
import Dashboard from './client/components/pages/Dashboard.js';
import NotFound from './client/components/pages/NotFound.js';
import App from './client/components/app.js';
import BrowseJobs from './client/components/pages/SearchJobs.js';
import BrowseStudents from './client/components/pages/SearchStudents.js';
import RegisterResident from './client/components/pages/RegisterResident';
import PostJob from './client/components/pages/PostJob';
import registerServiceWorker from './registerServiceWorker';

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);

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
    document.getElementById('app')
);
registerServiceWorker();
