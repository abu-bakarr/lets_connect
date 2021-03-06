import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import { deleteUserExperience } from '../../actions/profileAction'

const  Experience = ({ experience, deleteUserExperience})  => {
    var experiences
    if (experience){
    experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                 <Moment format="YYYY/MM/DD">{exp.from}</Moment >  ------ {
                     exp.to === null ? (" Now ") : (<Moment format="YYYY/MM/DD">{exp.to}</Moment >)
                 }
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteUserExperience(exp._id)}> Delete </button>
            </td>
        </tr>
    ))
    } else {
        return experiences = null
    }

    return (
        <Fragment>
            <h2 className="my-2"> Experience Credentials</h2>
            <table className="table">
                    <thead>
                        <tr>
                            <th>Company(s)</th>
                            <th className="hide-sm">Title</th>
                            <th className="hide-sm">Year</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {experiences}
                    </tbody>
            </table>
         </Fragment>
    )
}

Experience.propTypes = {
experience: PropTypes.array.isRequired,
deleteUserExperience: PropTypes.func.isRequired,
}

export default connect(null, {deleteUserExperience})(Experience)

