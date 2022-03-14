import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layouts/Spinner'
import {connect} from 'react-redux'
import {getUserGithub} from '../../actions/profileAction'

const  ProfileGithub =  ({username, getUserGithub, repos}) => {

    useEffect(() =>{
        getUserGithub(username)
    }, [getUserGithub(username), repos])

    return (
        <Fragment>
            <div className="profile-github">
                <h2 className="text-primary my-1">Recent Github Repos</h2>
                    {repos === null ? 
                    (<Spinner />)  :
                    (
                        repos.map(repo => (
                            <div key={repo._id} className="repo bg-white p-1 my-1">
                                <div>
                                    <h4>
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferer">
                                            {repo.name}
                                        </a>
                                    </h4>
                                 <p>{repo.description}</p>
                                </div>
                                <div>
                                    <ul>
                                        <li className="badge badge-primary">
                                            Stars: {repo.stargazers_count}
                                        </li>
                                        <li className="badge badge-dark">
                                            Watcher(s): {repo.watchers_count}
                                        </li>
                                        <li className="badge badge-light">
                                            Fork(s): {repo.forks_cunt}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    )
                  }

            </div>
        </Fragment>
    )
}

ProfileGithub.propTypes = {
    getUserGithub: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, {getUserGithub})(ProfileGithub)

