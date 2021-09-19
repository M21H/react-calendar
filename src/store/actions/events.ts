import { AppDispatch } from './../index'
import { SetGuestsAction, SetEventsAction, EventActionsEnum } from './../reducers/types/event'
import { IEvent } from './../../models/IEvent'
import { IUser } from './../../models/IUser'
import UserService from '../../api/UserService'

export const EventsActionCreators = {
	setGuests: (users: IUser[]): SetGuestsAction => ({ type: EventActionsEnum.SET_GUESTS, payload: users }),
	setEvents: (events: IEvent[]): SetEventsAction => ({ type: EventActionsEnum.SET_EVENTS, payload: events }),
	fetchGuests: () => async (dispatch: AppDispatch) => {
		try {
			const res = await UserService.getUsers()
			dispatch(EventsActionCreators.setGuests(res.data))
		} catch (error) {
			console.log(error)
		}
	},
	createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
		try {
			const events = localStorage.getItem('events') || '[]'
			const json = JSON.parse(events) as IEvent[]
			json.push(event)
			dispatch(EventsActionCreators.setEvents(json))
			localStorage.setItem('events', JSON.stringify(json))
		} catch (error) {
			console.log(error)
		}
	},
	fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
		try {
			const events = localStorage.getItem('events') || '[]'
			const json = JSON.parse(events) as IEvent[]
			const currentUserEvents = json.filter((ev) => ev.author === username || ev.guest === username)
			dispatch(EventsActionCreators.setEvents(currentUserEvents))
		} catch (error) {
			console.log(error)
		}
	},
}
