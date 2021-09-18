import { AppDispatch } from './../index'
import { IUser } from './../../models/IUser'
import { SetUserAction, AuthActionsEnum, SetErrorAction, SetIsLoadingAction, SetIsAuthAction } from './types/index'
import axios from 'axios'

export const ActionCreator = {
	setUser: (user: IUser): SetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
	setError: (error: string): SetErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload: error }),
	setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
		type: AuthActionsEnum.SET_IS_LOADING,
		payload: isLoading,
	}),
	setIsAuth: (isAuth: boolean): SetIsAuthAction => ({ type: AuthActionsEnum.SET_IS_AUTH, payload: isAuth }),
	login: (username: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(ActionCreator.setIsLoading(true))

      /* ====> imitation server`s response <==== */
			setTimeout(async () => {
				const res = await axios.get<IUser[]>('./users.json')
				const mockUsers = res.data.find((user) => user.username === username && user.password === password)
        console.log(res)
				if (mockUsers) {
					localStorage.setItem('auth', 'true')
					localStorage.setItem('username', mockUsers.username)
					dispatch(ActionCreator.setIsAuth(true))
					dispatch(ActionCreator.setUser(mockUsers))
				} else {
					dispatch(ActionCreator.setError('User name or user password not correct'))
				}
				dispatch(ActionCreator.setIsLoading(false))
			}, 1000)
      /* ====> imitation server`s response <==== */

		} catch (error) {
			dispatch(ActionCreator.setError('some error'))
		}
	},
	logout: () => async (dispatch: AppDispatch) => {},
}
