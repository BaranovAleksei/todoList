import React from 'react'
import { Dispatch } from 'redux'
import { setAppStatusAC } from "../../app/app-reducer"
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../common/error-utils";
import {createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false
}

export const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC( state: any, action: PayloadAction<{value: boolean}> ) {
       state.isLoggedIn =  action.payload.value
    }
  }
})

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions

// (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
// 	switch (action.type) {
// 		case 'login/SET-IS-LOGGED-IN':
// 			return {...state, isLoggedIn: action.value}
// 		default:
// 			return state
// 	}
// }

//action
// export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC({status:'loading'}))
	authAPI.login(data)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC( {value: true} ))
				dispatch(setAppStatusAC({status:'succeeded'}))
			} else {
				handleServerAppError( res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const logoutTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC({status:'loading'}))
	authAPI.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({ value: false}))
				dispatch(setAppStatusAC({status:'succeeded'}))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

// type ActionsType = ReturnType<typeof setIsLoggedInAC>

// type InitialStateType = {
// 	isLoggedIn: boolean
// }
//
// type ThunkDispatch = Dispatch<ActionsType | setAppStatusACT | setAppErrorACT>