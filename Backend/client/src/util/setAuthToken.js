import axios from 'axios'


const setAuthToken = token => {
    if (token) {
<<<<<<< HEAD
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
=======
        axios.defaults.headers.common['Authorization'] = token
    } else {
        delete axios.defaults.headers.common['Authorization']
>>>>>>> 964b40e21eda1503c1373a1e8e5a87b856aea176
    }
}

export default setAuthToken