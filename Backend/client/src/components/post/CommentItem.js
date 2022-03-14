import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {deleteComment} from '../../actions/postAction'

const CommentItem = ({postId, comment:{ _id, text, name, avatar, user, commentedAt}, auth, deleteComment}) => 
     (
        <div class="comments">
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt="user"
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">{text}</p>
             <p class="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{commentedAt}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
                <button className="btn btn-danger" onClick={e => deleteComment(postId, _id)}>
                    <i className="fas fa-trash"></i>{' '}
                </button>
            )}
          </div>
        </div>
        </div>
    );



CommentItem.propTypes = {
postId: PropTypes.number.isRequired,
comment: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired,
deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)
