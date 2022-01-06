import * as actionTypes from '../actions/actionTypes';

const initialState = {
    homeData: null,
    isFetching: true,
    queue: [],
    playingIndex: -1,
    playlistModalSong: null,
    isUpdatingPlaylistModal: false
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

            break;
        }
        case actionTypes.UPDATE_QUEUE: {
            newState.queue = [];

            action.value.songs.forEach(song => {
                newState.queue.push(song);
            });

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

        case actionTypes.CHANGE_PLAYLIST_MODAL_SONG: {
            newState.playlistModalSong = action.value.song;
            break;
        }

        case actionTypes.UPDATING_PLAYLIST_MODAL: {
            newState.isUpdatingPlaylistModal = action.value.isUpdating;
            break;
        }

        default: {
            newState = state;
        }
    }

    return newState;
}

export default reducer;