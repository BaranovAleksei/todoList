export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
	status:  'loading',
	error: null
}
type InitialStateType = {
	status: RequestStatusType
	error: string | null
}
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null ) => ({type: 'APP/SET-ERROR', error} as const)

export type setAppErrorACT = ReturnType<typeof setAppErrorAC>
export type setAppStatusACT = ReturnType<typeof setAppStatusAC>

type ActionType = setAppErrorACT | setAppStatusACT

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		case 'APP/SET-ERROR':
			return {...state, error: action.error}
		default:
			return state
	}
}