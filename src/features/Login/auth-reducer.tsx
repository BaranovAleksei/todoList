import React from 'react'
import { Dispatch } from 'redux'
import {setAppErrorAC, setAppErrorACT, setAppStatusAC, setAppStatusACT} from "../../app/app-reducer"
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../common/error-utils";
import {SetTodolistsActionType} from "../TodolistsList/todolists-reducer";

const initialState = {
	isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return {...state, isLoggedIn: action.value}
		default:
			return state
	}
}
//action
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | setAppStatusACT | setAppErrorACT>) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.login(data)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC( true))
				dispatch(setAppStatusAC('succeeded'))
			} else {
				handleServerAppError( res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType | setAppStatusACT | setAppErrorACT>) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(false))
				dispatch(setAppStatusAC('succeeded'))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

type ActionsType = ReturnType<typeof setIsLoggedInAC>

type InitialStateType = {
	isLoggedIn: boolean
}

type ThunkDispatch = Dispatch<ActionsType | setAppStatusACT | setAppErrorACT>