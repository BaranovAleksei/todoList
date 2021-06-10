import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type StateType = {
  status: StatusType,
  error:  null | string
  isInitialized: boolean
}

const initialState: StateType = {
	status:  'idle',
	isInitialized: false,
	error: null
}

export const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatusAC ( state, action: PayloadAction<{status: StatusType}>) {
      state.status = action.payload.status
    },
    setAppErrorAC ( state, action: PayloadAction<{ error: null | string}>) {
      state.error = action.payload.error
    },
    setAppIsInitializedAC ( state, action: PayloadAction<{isInitialized: boolean}> ) {
      state.isInitialized = action.payload.isInitialized
    }
  }
})

export const appReducer = slice.reducer
export const { setAppStatusAC, setAppErrorAC, setAppIsInitializedAC } = slice.actions

// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setAppErrorAC = (error: string | null ) => ({type: 'APP/SET-ERROR', error} as const)
// export const setAppIsInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export type setAppErrorACT = ReturnType<typeof setAppErrorAC>
export type setAppStatusACT = ReturnType<typeof setAppStatusAC>
export type setAppIsInitializedACT = ReturnType<typeof setAppIsInitializedAC>

// type ActionType = setAppErrorACT | setAppStatusACT | setAppIsInitializedACT

// export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
// 	switch (action.type) {
// 		case 'APP/SET-STATUS':
// 			return {...state, status: action.status}
// 		case 'APP/SET-ERROR':
// 			return {...state, error: action.error}
// 		case 'APP/SET-IS-INITIALIZED':
// 			return {...state, isInitialized: action.value}
// 		default:
// 			return state
// 	}
// }

//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
	authAPI.me()
		.then( res => {
			if (res.data.resultCode === 0 ) {
				dispatch(setIsLoggedInAC({value: true}))
			} else {
				console.log('not login')
			}
			dispatch(setAppIsInitializedAC({ isInitialized: true }))
		})
}