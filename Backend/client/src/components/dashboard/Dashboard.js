import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getUserProfile, deleteUserAccount} from '../../actions/profileAction'
import Spinner from '../layouts/Spinner'
import DashboardLinks from './DashboardLinks'
import Experience from './Experience'
import Education from './Education'
import { Link } from 'react-router-dom'


const Dashboard = ({ 
    getUserProfile,
    deleteUserAccount,
     auth:{ user}, 
     profile: { profile, loading},
    }) => {
    
    useEffect(() => {
        getUserProfile();
    },[getUserProfile]);

    console.log("getUserProfile User", profile);
    return loading  ? (<Spinner />) : 
           (<Fragment>
                 <h1 className="large text-primary">Dashboard</h1>   
                 <h5 className="lead">
                 <i className="fas fa-user">{'  '}</i>
                        Welcome { profile?.name}
                 </h5>
                 { profile?.name !== null ?
                        (<Fragment>
                                 <DashboardLinks/>
                                <Experience experience={profile.experience} />
                                <Education education={profile.education} />                
                                <div className="my-2">
                                        <button className="btn btn-danger" onClick={e => deleteUserAccount()}>
                                            <i className="fas fa-user-minus"></i>{" "} Delete Account
                                        </button>
                                </div>
                        </Fragment>)
                                :
                        (<Fragment>
                                 {/* <p>Please Refresh this page, ensure to EDIT your profile if you registered for the first time.</p> */}
                                <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
                        </Fragment>)}
            </Fragment>)
}

Dashboard.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    deleteUserAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect (mapStateToProps, {getUserProfile, deleteUserAccount}) (Dashboard)

