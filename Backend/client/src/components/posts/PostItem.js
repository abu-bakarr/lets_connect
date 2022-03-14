import React, {Fragment}from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {updateLike, removeLike, deletePost} from '../../actions/postAction'


const PostItem = ({
    auth, 
    post: {_id, text, name, likes, comments, user, avatar, commentedAt},
    updateLike, removeLike, deletePost, showActions
}) => 
     (
     <div className="post bg-white p-1 my-1">
          <div>
            <Link to="#">
              <img
                className="round-img"
                src={avatar}
                alt="user"
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{text}</p>
             <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD" >{commentedAt}</Moment>
            </p>
            { showActions && (<Fragment>
                <button type="button" onClick={e => updateLike(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
             <span>{likes.length > 0 && (
                 <span className='comment-count'>{likes.length}</span>
             )}</span>
            </button>
            <button type="button"  onClick={e => removeLike(_id)} className="btn btn-light">
             <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
             Discussion  {comments.length > 0 && (
                 <span className='comment-count'>{comments.length}</span>
             )}
             
            </Link>
            {!auth.loading && user === auth.user._id && (
                <button      
                type="button"
                onClick={e => deletePost(_id)}
                className="btn btn-danger"
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
            </Fragment>)}
          </div>
        </div>
    );

PostItem.defaultProps = {
    showActions: true
}


PostItem.propTypes = {
auth: PropTypes.object.isRequired,
post: PropTypes.object.isRequired,
deletePost: PropTypes.func.isRequired,
updateLike: PropTypes.func.isRequired,
removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { updateLike, removeLike, deletePost})(PostItem);
