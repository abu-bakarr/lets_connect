import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {deleteUserEducation} from '../../actions/profileAction'

const  Education = ({ education, deleteUserEducation})  => {
    var educations 
    if (education ){
    educations = education.map(edu => { return (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                 <Moment format="YYYY/MM/DD">{edu.from}</Moment > ------- {
                     edu.to === null ? (" Now ") : (<Moment format="YYYY/MM/DD">{edu.to}</Moment >)
                 }
            </td>
            <td>
                 <button className="btn btn-danger" onClick={() => deleteUserEducation(edu._id)}> Delete</button>
            </td>
        </tr>
    )})
     } else {
         educations = null
     }
        
    return (
        <Fragment>
                <h2 className="my-2"> Education Credentials</h2>
            <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree / Certificate(s)</th>
                            <th className="hide-sm">Year</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {educations}
                    </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteUserEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteUserEducation})(Education)

