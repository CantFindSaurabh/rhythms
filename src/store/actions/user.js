import * as actionTypes from "../../store/actions/actionTypes";

export const updateFetchingState = newFetchState => {
    return {
        type: actionTypes.UPDATE_FETCHING_STATE,
        value: {
            isFetching: newFetchState
        }
    }
}
export const updateErrorState = newErrorState => {
    return {
        type: actionTypes.UPDATE_ERROR,
        value: {
            error: newErrorState
        }
    }
}
export const updateUserCredentials = newCredentials => {

    if (newCredentials.token) {
        localStorage.setItem('jwtToken', newCredentials.token);
    }

    return {
        type: actionTypes.UPDATE_CREDENTIALS,
        value: newCredentials
    }
}

export const loginUser = (email, password) => {
    const requestBody = {
        email,
        password
    };

    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
    };

    return async dispatch => {

        dispatch(updateFetchingState(true));

        let res = await fetch(process.env.REACT_APP_BACKEND + "/users/login", params);
        const data = await res.json();

        if (!res.ok) {
            dispatch(updateErrorState(data.error));
        }
        else {
            dispatch(updateUserCredentials({
                ...data.user,
                token: data.token,
                isAuthenticated: true
            }));
        }

        dispatch(updateFetchingState(false));
    };
};


export const sendSignupOtp = email => {

    const requestBody = {
        email
    };

    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }

    return async dispatch => {

        dispatch(updateFetchingState(true));

        let res = await fetch(process.env.REACT_APP_BACKEND + '/users/signup/send-otp', params);
        const data = await res.json();

        if (!res.ok) {
            dispatch(updateErrorState(data.error));
        }

        dispatch(updateFetchingState(false));
    }
}

export const signupUser = (name, email, password, otp) => {

    const requestBody = {
        name,
        email,
        password,
        otp
    }

    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }

    return async dispatch => {

        dispatch(updateFetchingState(true));

        const res = await fetch(process.env.REACT_APP_BACKEND + '/users/signup/verify-otp', params);
        const data = await res.json();

        if (!res.ok) {
            dispatch(updateErrorState(data.error));
        }
        else {
            dispatch(updateUserCredentials({
                ...data.user,
                token: data.token,
                isAuthenticated: true
            }));
        }

        dispatch(updateFetchingState(false));
    }
}

export const sendResetPasswordOtp = email => {

    const requestBody = {
        email
    };

    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }

    return async dispatch => {

        dispatch(updateFetchingState(true));

        let res = await fetch(process.env.REACT_APP_BACKEND + '/users/forgot-pass/send-otp', params);
        const data = await res.json();

        if (!res.ok) {
            dispatch(updateErrorState(data.error));
        }

        dispatch(updateFetchingState(false));
    }
}


export const resetPassword = (email, password, otp) => {

    const requestBody = {
        email,
        password,
        otp
    }

    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }

    return async dispatch => {

        dispatch(updateFetchingState(true));

        const res = await fetch(process.env.REACT_APP_BACKEND + '/users/forgot-pass/verify-otp', params);
        const data = await res.json();

        if (!res.ok) {
            dispatch(updateErrorState(data.error));
        }
        else {
            dispatch(updateUserCredentials({
                ...data.user,
                token: data.token,
                isAuthenticated: true
            }));
        }

        dispatch(updateFetchingState(false));

    }
}

export const fetchUserProfile = token => {

    const params = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "authorization": token
        }
    }

    return async dispatch => {

        dispatch(updateFetchingState(true));

        const res = await fetch(process.env.REACT_APP_BACKEND + '/users/me', params);
        const data = await res.json();

        if (res.ok) {
            dispatch(updateUserCredentials({
                ...data.user,
                token,
                isAuthenticated: true
            }))
        }

        dispatch(updateFetchingState(false));
    }
}

export const addToFavorites = (song, token) => {

    return dispatch => {

        const params = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({ song })
        }

        fetch(process.env.REACT_APP_BACKEND + '/users/favorites', params);

        dispatch({
            type: actionTypes.ADD_TO_FAVORITES,
            value: {
                song
            }
        })
    }
}

export const removeFromFavorites = (song, token) => {

    return dispatch => {

        const params = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({ song })
        }

        fetch(process.env.REACT_APP_BACKEND + '/users/favorites', params);

        dispatch({
            type: actionTypes.REMOVE_FROM_FAVORITES,
            value: {
                song
            }
        })
    }
}

export const logoutUser = token => {
    return async dispatch => {

        const params = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({ token })
        }

        const res = await fetch(process.env.REACT_APP_BACKEND + '/users/logout', params);

        if (res.ok) {
            dispatch({
                type: actionTypes.LOGOUT_USER
            })
        }
    }
}

