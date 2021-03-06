import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import {addUserExperience} from '../../actions/profileAction'

const AddExperience = ({ addUserExperience, history}) => {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
    })

    const [displayDateTo, toggleDisplayDateTo] = useState(false)

    const {  title,
        company,
        location,
        from,
        to,
        current,
        description} = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        addUserExperience(formData, history)
    }
    return (
        <Fragment>
                <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)} >
                        <div className="form-group">
                        <input type="text" placeholder="* Job Title" value={title} onChange={e => onChange(e)} name="title" required />
                        </div>
                        <div className="form-group">
                        <input type="text" placeholder="* Company" value={company} onChange={e => onChange(e)} name="company" required />
                        </div>
                        <div className="form-group">
                        <input type="text" placeholder="Location" value={location} onChange={e => onChange(e)} name="location" required />
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
                        checked={current} /> {" "}Current Job</p>
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
                            placeholder="Job Description"
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

AddExperience.propTypes = {
addUserExperience: PropTypes.func.isRequired,
}


export default connect(null, {addUserExperience})( withRouter(AddExperience))
