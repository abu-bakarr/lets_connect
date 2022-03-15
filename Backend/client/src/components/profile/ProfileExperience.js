import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'


function ProfileExperience({
    experience: {
        company,
        location,
        current,
        from,
        to,
        description,
        title
    }}) {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> ---- {!to ? ("Now") : 
                <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
                <strong>Position: </strong> {title ? title : "No Title Added"}
            </p>      
             <p>
                <strong>Description: </strong> {description ? description : "No Description Added"}
            </p>
            <p>
                <strong>Located at: </strong> {location ? location : "No Location Added"}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
experience: PropTypes.object.isRequired,
}

export default ProfileExperience

