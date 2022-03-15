import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile'
import EditProfile from '../profile-forms/EditProfile'
import AddExperience from '../profile-forms/AddExperience'
import AddEducation from '../profile-forms/AddEducation'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import NotFound from '../layouts/NotFound'
import PrivateRoute from '../routes/privateRoute'
import Alert from '../layouts/Alert'
<<<<<<< HEAD
import About from '../profile/About'

=======
>>>>>>> 964b40e21eda1503c1373a1e8e5a87b856aea176

const Routes = () => {
    return (
        <section className="container">
        <Alert />
        <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
<<<<<<< HEAD
            <Route exact path="/about" component={About} />
=======
>>>>>>> 964b40e21eda1503c1373a1e8e5a87b856aea176
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/posts/:id" component={Post} />
            <Route component={NotFound} />
        </Switch>
    </section>
    );
};



export default Routes;
