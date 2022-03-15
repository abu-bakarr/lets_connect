import React,  { Fragment, useEffect }  from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Routes from './components/routes/Routes'

//Redux Component

import {loadUser} from '../src/actions/authAction'
// Redux Instantiating
import {Provider} from 'react-redux'
import store from './Store'
import setAuthToken from './util/setAuthToken';

import "tailwindcss/tailwind.css";


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const  App = () => {

  useEffect(() =>{
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
  <Router>
    <Fragment>
        <Navbar />
        <Switch>
        <Route exact path="/" component={Landing} />
              <Route component={Routes} />
        </Switch>  
    </Fragment>
</Router>
</Provider>
  );
}

export default App;
