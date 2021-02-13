import axios from 'axios';

axios.defaults.withCredentials = true;

const APICall = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

// For more complete documentation. search for 'npm axios'
// Example Use:
// If the endpoint is localhost:5000/users,
// put localhost:5000 to REACT_APP_BACKEND_URL in .env

// To do a GET request.
// APICall.get(`users`)
//             .then(res => {
//                  /* If successful */
//                 /* Insert code here */
//             }).catch(() => {
//                  /* If error */
//                 /* Insert code here */
//             })

// To do a POST request with endpoint localhost:5000/users
// APICall.post(`users`, {
//     payload1: /* Insert payload here */,
//     payload2: /* Insert payload here */
// })
//             .then(res => {
//                  /* If successful */
//                 /* Insert code here */
//             }).catch(() => {
//                  /* If error */
//                 /* Insert code here */
//             })

// To do a PUT request with endpoint localhost:5000/users/1
// APICall.post(`users/1`, {
//     payload1: /* Insert payload here */,
//     payload2: /* Insert payload here */
// })
//             .then(res => {
//                  /* If successful */
//                 /* Insert code here */
//             }).catch(() => {
//                  /* If error */
//                 /* Insert code here */
//             })

export default APICall;