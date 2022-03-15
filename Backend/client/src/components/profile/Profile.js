import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from '../layouts/Spinner'
import {getProfileById} from '../../actions/profileAction'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import { useState } from 'react'

const  Profile =({ 
    getProfileById, 
    auth, 
    profile: { profile, loading}, 
    match }) => {

    const [myp, setP] = useState([])

    useEffect(() =>{
       const resp =  getProfileById(match.params.id)
        setP(resp)
    }, [getProfileById])

    console.log("profile===> id", match.params.id)
    console.log("myp===>", myp)

    return (
        <Fragment>
            {profile === null || loading ?
             <Spinner /> : 
             <Fragment>
                 {auth.isAuthenticated && auth?.loading === false && auth?.user?._id === profile.user._id &&
                 (<Link to="/edit-profile" className="btn btn-dark">
                     <i className="fas fa-pencil-square"></i>{' '}
                      Edit Profile</Link>)
                }
                 <div className="profile-grid my-1">
                    <ProfileTop  profile={profile}  />
                    <ProfileAbout  profile={profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        { profile?.experience.length > 0 ? (
                            <Fragment>
                                {profile?.experience.map(exp => (
                                    <ProfileExperience key={exp?._id} experience={exp} />
                                ))}
                            </Fragment>
                        ) : 
                        (<h4>No Experience Record found</h4>)
                        }
                    </div>
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile?.education.length > 0 ? (
                            <Fragment>
                                {profile?.education.map(edu => (
                                    <ProfileEducation key={edu?._id} education={edu} />
                                ))}
                            </Fragment>
                        ) : 
                        (<h4>No Educational Record found</h4>)}
                    </div>
              {profile?.githubusername && <ProfileGithub username={profile?.githubusername}/> } 
            </div>
            <Link to="/profiles" className="btn bn-light">
            <i className="fas fa-share"></i>{' '}
                     Go Back
                 </Link>
            </Fragment>
            }
         </Fragment>
    )
}

Profile.propTypes = {
getProfileById: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, {getProfileById})(Profile)

