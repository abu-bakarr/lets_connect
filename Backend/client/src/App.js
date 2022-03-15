import React,  { Fragment, useEffect }  from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Routes from './components/routes/Routes'
<<<<<<< HEAD
import './styles/output.css'
=======

>>>>>>> 964b40e21eda1503c1373a1e8e5a87b856aea176
//Redux Component

import {loadUser} from '../src/actions/authAction'
// Redux Instantiating
import {Provider} from 'react-redux'
import store from './Store'
import setAuthToken from './util/setAuthToken';

<<<<<<< HEAD
import "tailwindcss/tailwind.css";


=======
>>>>>>> 964b40e21eda1503c1373a1e8e5a87b856aea176
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
