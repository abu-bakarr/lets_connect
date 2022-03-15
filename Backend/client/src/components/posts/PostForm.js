import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addPost} from '../../actions/postAction'

const PostForm = ({ addPost}) => {
    const [text, setText] = useState("")

    const onSubmit = e => {
        e.preventDefault()
        addPost({ text })
        setText(" ")
    } 
    return (
        <Fragment>
                  <div className="post-form">
                    <div className="bg-primary p">
                        <h3>Say Something...</h3>
                    </div>
                <form className="form my-1" onSubmit={e => onSubmit(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={text}
                    placeholder="Create a post"
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
      </div>
        </Fragment>
    );
};


PostForm.propTypes = {
addPost: PropTypes.func.isRequired,
};


export default connect(null, {addPost})(PostForm)
