import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'


function ProfileEducation({
    education: {
        school,
        fieldofstudy,
        current,
        from,
        to,
        description,
        degree
    }}) {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> ---- {!to ? ("Now") : 
                <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
                <strong>Degree/Certificate: </strong> {degree ? degree : "No Degree/Certificate Added"}
            </p>      
             <p>
                <strong>Description: </strong> {description ? description : "No Description Added"}
            </p>
            <p>
                <strong>Field of Study: </strong> {fieldofstudy ? fieldofstudy : "No Field of Study Added"}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
education: PropTypes.object.isRequired,
}

export default ProfileEducation

