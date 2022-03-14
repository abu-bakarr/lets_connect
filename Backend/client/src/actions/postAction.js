import axios from 'axios'
import { setAlert } from './alertAction'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    REMOVE_COMMENT
} from './constants'

export const getPosts = () => async dispatch => {
    try {
        const response = await axios.get("http://localhost:5000/api/posts")

        dispatch({
            type: GET_POSTS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//Add users Like
export const updateLike = id => async dispatch => {
    try {
        const response = await axios.put(`http://localhost:5000/api/posts/likes/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: response.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}


//Remove users Like
export const removeLike = id => async dispatch => {
    try {
        const response = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: response.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//delete users Post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post removed', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//add users Post
export const addPost = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await axios.post("http://localhost:5000/api/posts", formData, config)
        dispatch({
            type: ADD_POST,
            payload: response.data
        })
        dispatch(setAlert('Post Added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//Get  Single Post
export const getPost = id => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`)
        dispatch({
            type: GET_POST,
            payload: response.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//Add Cmment
export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, formData, config)
        dispatch({
            type: ADD_POST,
            payload: response.data
        })
        dispatch(setAlert('Comment Added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

//Remove Cmment
export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment Deleted', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}