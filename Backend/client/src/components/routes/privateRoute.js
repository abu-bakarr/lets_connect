import React from 'react'
import {Redirect, Route}from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const privateRoute = ({component: Component, auth:{isAuthenticated, loading}, ...rest}) => (
<Route {...rest} render={props => 
            !isAuthenticated && !loading ? (<Redirect to="/login"/>) : (<Component {...props} />) } />
)

privateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapToStateProps = state =>({
    auth: state.auth
})

export default connect(mapToStateProps)(privateRoute)

