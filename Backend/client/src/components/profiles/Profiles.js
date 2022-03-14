import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import PropTypes from 'prop-types'
import ProfileItem from './ProfileItem'
import {getAllProfiles} from '../../actions/profileAction'

const  Profiles = ({ getAllProfiles, profile: {profiles, loading}}) =>{
    useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles])

    return (
        <Fragment>
            {loading ? <Spinner />  : 
                            <Fragment>
                                <h1 className="large text-primary">Developers</h1>
                                    <p className="lead">
                                        <i className="fab fa-connectdevelop"></i>
                                        Browser and Connect with Developers
                                    </p>
                                
                                <div className="profiles">
                                    {profiles.length > 0 ?  (
                                        profiles.map(profile => (
                                            <ProfileItem key={profile._id} profile={profile} />
                                        ))
                                        ) : 
                                     <h4>No Profiles found.....</h4>
                                    }
                                </div>
                            </Fragment>
            }
        </Fragment>
    )
}

Profiles.propTypes = {
getAllProfiles: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getAllProfiles})(Profiles)

