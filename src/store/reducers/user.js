import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    token: null,
    _id: null,
    name: null,
    email: null,
    favorites: [],
    error: {
        login: {
            email: "",
            password: ""
        },
        signup: {
            name: "",
            email: "",
            password: "",
            otp: ""
        },
        forgotPass: {
            email: "",
            otp: "",
            password: ""
        }
    },
    isFetching: false
};

const reducer = (state = initialState, action) => {
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case actionTypes.UPDATE_CREDENTIALS: {
            newState = {
                ...newState,
                ...action.value
            }

            break;
        }

        case actionTypes.UPDATE_ERROR: {
            const errorType = Object.keys(action.value.error)[0];
            const errors = Object.keys(action.value.error[errorType]);

            errors.forEach(error => {
                newState.error[errorType][error] = action.value.error[errorType][error]
            });

            break;
        }

        case actionTypes.UPDATE_FETCHING_STATE: {
            newState.isFetching = action.value.isFetching;
            break;
        }

        case actionTypes.ADD_TO_FAVORITES: {
            newState.favorites.push(action.value.song);
            break;
        }

        case actionTypes.REMOVE_FROM_FAVORITES: {

            for (let i = 0; i < newState.favorites.length; i++) {
                if (action.value.song.song_id === newState.favorites[i].song_id) {
                    newState.favorites.splice(i, 1);
                }
            }
            break;
        }

        case actionTypes.LOGOUT_USER: {
            newState.isAuthenticated = false;
            localStorage.removeItem("jwtToken");
            console.log("LOGOUt")
            break;
        }

        default: {
            newState = state;
        }
    }

    return newState;
};

export default reducer;
