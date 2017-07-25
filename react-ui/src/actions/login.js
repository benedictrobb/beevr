import axios from 'axios';
import {SET_AUTH} from '../constants/action_types.js';

export const loginRequest = (email, password) => dispatch => {
    dispatch({
        type: SET_AUTH,
        status: 'pending'
    });

    axios
        .get('/api/auth', {params: {email, password}})
        .then(response => {
            dispatch({
                type: SET_AUTH,
                status: 'succes',
                response: response.confirm
            })
                .then(console.log(response))
                .then();
        })
        .catch(error => {
            dispatch({
                type: SET_AUTH,
                status: 'error',
                error: 'Invalid credentials'
            });
        });
};

        //const  = res.rows[0];
        //bcrypt.compare(password, user.password, (err, isValid) => {
          //if (err) throw err;
          //if (isValid) {
            //req.cookieAuth.set({ username });
            //reply.redirect('/create-post');
          //} else {
            //reply.view('failed-login');
          //}
        //});
      //});
    //} else {
      //reply.view('failed-login');
    //}
