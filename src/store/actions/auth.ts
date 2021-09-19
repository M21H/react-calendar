import { AppDispatch } from '../index'
import { IUser } from '../../models/IUser'
import {
	SetUserAction,
	AuthActionsEnum,
	SetErrorAction,
	SetIsLoadingAction,
	SetIsAuthAction,
} from '../reducers/types/auth'
import UserService from '../../api/UserService'

export const AuthActionCreators = {
	setUser: (user: IUser): SetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
	setError: (error: string): SetErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload: error }),
	setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
		type: AuthActionsEnum.SET_IS_LOADING,
		payload: isLoading,
	}),
	setIsAuth: (isAuth: boolean): SetIsAuthAction => ({ type: AuthActionsEnum.SET_IS_AUTH, payload: isAuth }),
	login: (username: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthActionCreators.setIsLoading(true))

			/* ====> imitation server`s response <==== */
			setTimeout(async () => {
				const res = await UserService.getUsers()
				const mockUsers = res.data.find((user) => user.username === username && user.password === password)
				if (mockUsers) {
					localStorage.setItem('auth', 'true')
					localStorage.setItem('username', mockUsers.username)
					dispatch(AuthActionCreators.setUser(mockUsers))
					dispatch(AuthActionCreators.setIsAuth(true))
				} else {
					dispatch(AuthActionCreators.setError('User name or user password not correct'))
				}
				dispatch(AuthActionCreators.setIsLoading(false))
			}, 1000)
			/* ====> imitation server`s response <==== */
		} catch (error) {
			dispatch(AuthActionCreators.setError('some error'))
		}
	},
	logout: () => async (dispatch: AppDispatch) => {
		localStorage.removeItem('auth')
		localStorage.removeItem('username')
		dispatch(AuthActionCreators.setUser({} as IUser))
		dispatch(AuthActionCreators.setIsAuth(false))
	},
}
