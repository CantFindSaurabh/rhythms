import * as actionTypes from '../actions/actionTypes';

export const fetchHomeData = authToken => {

    return async dispatch => {

        dispatch({
            type: actionTypes.UPDATE_HOME_FETCHING_STATE,
            value: {
                fetching: true
            }
        })

        const params = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "authorization": authToken
            }
        }

        let res = await fetch(process.env.REACT_APP_BACKEND + '/landing-data', params);
        res = await res.json();

        console.log(res);

        dispatch({
            type: actionTypes.UPDATE_HOME_FETCHING_STATE,
            value: {
                fetching: false
            }
        })
        dispatch({
            type: actionTypes.UPDATE_HOME_DATA,
            value: {
                data: res
            }
        })
    }
}

export const updatePlayingQueue = (songs, index) => {
    return {
        type: actionTypes.UPDATE_QUEUE,
        value: {
            songs,
            playingIndex: index
        }
    }
}

export const updatePlayingIndex = index => {
    return {
        type: actionTypes.UPDATE_PLAYING_INDEX,
        value: {
            playingIndex: index
        }
    }
}

