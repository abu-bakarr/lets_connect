import React, {Fragment} from 'react'
import spinner from './shot.gif'

const  Spinner = () => {
    return(
    <Fragment>
        <img
                src={spinner}
                style={{width: '40%', margin: 'auto',display:'block' }}
                alt="Loading........"
        />
        <h4 style={{width: '40%', margin: 'auto',display:'block' }}>Please Refresh the page whilst Loading......</h4>
    </Fragment>
    )
}

export default Spinner