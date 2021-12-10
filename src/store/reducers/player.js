import * as actionTypes from '../actions/actionTypes';

const initialState = {
    homeData: null,
    isFetching: false,
    queue: [],
    playingIndex: -1,
}

const reducer = (state = initialState, action) => {

    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case actionTypes.UPDATE_HOME_DATA: {
            newState.homeData = action.value.data;
            break;
        }
        case actionTypes.UPDATE_HOME_FETCHING_STATE: {
            newState.isFetching = action.value.fetching;
            break;
        }

        case actionTypes.ADD_TO_QUEUE: {
            newState.queue.unshift(action.value.song);
            newState.playingIndex = 0;

            if (newState.queue.length > 15) {
                newState.queue.splice(0, 15);
            }

            break;
        }
        case actionTypes.UPDATE_QUEUE: {
            newState.queue = [];

            action.value.songs.forEach(song => {
                newState.queue.push(song);
            });

            if (newState.queue.length > 15) {
                newState.queue.splice(0, 15);
            }

            newState.playingIndex = action.value.playingIndex;
            break;
        }
        case actionTypes.CLEAR_QUEUE: {
            newState.queue = [];
            newState.playingIndex = -1;
            break;
        }

        case actionTypes.UPDATE_PLAYING_INDEX: {
            newState.playingIndex = action.value.playingIndex;

            if (newState.playingIndex >= newState.queue.length) {
                newState.playingIndex = 0;
            }

            if (newState.playingIndex < 0) {
                newState.playingIndex = 0;
            }

            break;
        }

        default: {
            newState = state;
        }
    }

    return newState;
}

export default reducer;