import { createReducer } from 'reduxsauce';
import { Types } from 'redux/actions/user'
import { success } from 'utils/action'

export const initialState = {
    result: {},
    masters: [],
}

const signInSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const signUpSuccess = (state, action) => ({
    ...state,
    ...action.payload
})

const getUsersSuccess = (state, action) => ({
    ...state,
    masters: [
        ...action.payload.list
    ]
})

const signOut = (state, action) => (initialState)

const handler = {
    [success(Types.SIGN_IN)]: signInSuccess,
    [success(Types.SIGN_UP)]: signUpSuccess,
    [success(Types.GET_USERS)]: getUsersSuccess,
    [Types.SIGN_OUT]: signOut,
}

export default createReducer(initialState, handler);