import React from 'react'
import Login from '../pages/Login'
import Event from '../pages/Event'

export interface IRouts {
	path: string
	component: React.ComponentType
	exact?: boolean
}

export enum RouteNames {
	LOGIN = '/login',
	EVENT = '/',
}

export const publicRouts: IRouts[] = [
	{
		path: RouteNames.LOGIN,
		component: Login,
		exact: true,
	},
]

export const privateRouts: IRouts[] = [
	{
		path: RouteNames.EVENT,
		component: Event,
		exact: true,
	},
]
