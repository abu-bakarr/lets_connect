import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import {addUserEducation} from '../../actions/profileAction'

const AddEducation = ({ addUserEducation, history}) => {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
    })

    const [displayDateTo, toggleDisplayDateTo] = useState(false)

    const {  school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description} = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        addUserEducation(formData, history)
    }
    return (
        <Fragment>
              <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, University, etc that
        you have attended
      </p>
      <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)} >
                        <div className="form-group">
                        <input type="text" placeholder="* School" value={school} onChange={e => onChange(e)} name="school" required />
                        </div>
                        <div className="form-group">
                        <input type="text" placeholder="* Degree or Certificate" value={degree} onChange={e => onChange(e)} name="degree" required />
                        </div>
                        <div className="form-group">
                        <input type="text" placeholder="Field of study" value={fieldofstudy} onChange={e => onChange(e)} name="fieldofstudy"  required/>
                        </div>
                        <div className="form-group">
                        <h4>From Date</h4>
                        <input type="date" value={from} onChange={e => onChange(e)} name="from" required />
                        </div>
                        <div className="form-group">
                        <p><input 
                        type="checkbox" 
                        value={current} 
                        onChange={e =>{
                            setFormData({ ...formData, current: !current})
                            toggleDisplayDateTo(!displayDateTo)
                        }} 
                        name="current" 
                        checked={current} /> {" "}Current School or Bootcamp</p>
                        </div>
                        <div className="form-group">
                        <h4>To Date</h4>
                        <input type="date" 
                        value={to} 
                        onChange={e => onChange(e)} 
                        name="to"  
                        disabled ={ displayDateTo === false ? "" : 'disabled'}/>
                        </div>
                        <div className="form-group">
                        <textarea
                            value={description} onChange={e => onChange(e)} name="description"
                            cols="30"
                            rows="5"
                            placeholder="Program Description"
                        ></textarea>
                        </div>
                        <input type="submit" className="btn btn-primary my-1" />
                       <Link to="/dashboard">
                            <i className="fas fa-share"></i>{' '}
                            Go Back</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
addUserEducation: PropTypes.func.isRequired,
}


export default connect(null, {addUserEducation})( withRouter(AddEducation))
