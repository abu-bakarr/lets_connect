import axios from 'axios'
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    CLEAR_PROFILE,
    GET_REPOS
} from './constants'
import { setAlert } from './alertAction'

//Get current users profile after loggin
export const getUserProfile = () => async dispatch => {
    const accessToken = localStorage.getItem("token");
    try {
        const response = await axios.get("http://localhost:5000/api/profile/me", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `bearer ${accessToken}`
            },
        })

        console.log("profile Action =>", response)

        dispatch({
            type: GET_PROFILE,
            payload: response.data
        })

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//Get All users profile after loggin
export const getAllProfiles = () => async dispatch => {
    try {
        const response = await axios.get("http://localhost:5000/api/profile")

        dispatch({
            type: GET_PROFILES,
            payload: response.data
        })
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//Get All users profile by ID after loggin
export const getProfileById = user_id => async dispatch => {

    try {
        const response = await axios.get(`http://localhost:5000/api/profile/user/${user_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        console.log("profiles ya ", response)
        dispatch({
            type: GET_PROFILE,
            payload: response.data
        })

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//Get  users Git hub repos 
export const getUserGithub = username => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:5000/api/profile/github/${username}`)

        dispatch({
            type: GET_REPOS,
            payload: response.data
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//Create or Update User Profile
export const createUserProfile = (formData, history, edit = false) => async dispatch => {
    const accessToken = localStorage.getItem("token");

    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `bearer ${accessToken}`
            },
        }
        const response = await axios.post("http://localhost:5000/api/profile", formData, config)

        dispatch({
            type: GET_PROFILE,
            payload: response.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        if (!edit) {
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add Experience 
export const addUserExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put("http://localhost:5000/api/profile/experience", formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        })

        dispatch(setAlert('Experience Created', 'success'))
        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error, 'danger'))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

// Add Education 
export const addUserEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put("http://localhost:5000/api/profile/education", formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        })

        dispatch(setAlert('Education Created', 'success'))
        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete  User Experience
export const deleteUserExperience = id => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        });
        dispatch(setAlert('Experience Deleted', 'success'));
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete  User Education
export const deleteUserEducation = id => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        })
        dispatch(setAlert('Education Deleted', 'success'))
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete  User Education
export const deleteUserAccount = () => async dispatch => {
    if (window.confirm('Are you sure ? Please note you all your information will be deleted')) {
        try {
            await axios.delete("http://localhost:5000/api/profile")

            dispatch({
                type: CLEAR_PROFILE
            })
            dispatch({
                type: ACCOUNT_DELETED
            })

            dispatch(setAlert('Your account has been deleted'))

        } catch (err) {

            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })

        }
    }
}