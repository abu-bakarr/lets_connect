import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getPost} from '../../actions/postAction'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

const Post = ({ getPost, match, post: {loading, post}}) => {

    useEffect(() =>{
        getPost(match.params.id)
    }, [getPost(match.params.id), post ])

    return loading || post === null ? 
                <Spinner /> :
                <Fragment>
                        <PostItem post={post} showActions={false} />
                        <CommentForm postId={post._id} />
                        <div className="comments">
                            {post.comments.map(comment => (
                                <CommentItem key={comment._id} postId={post._id} comment={comment}/>
                            ))}
                        </div>
                        <Link to="/posts" className="btn">
                            Go Back
                        </Link>
                </Fragment>

};


Post.propTypes = {
getPost: PropTypes.func.isRequired,
post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPost})(Post)
