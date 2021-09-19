import { EventAction, EventActionsEnum, EventState } from './types/event'

const initialState: EventState = {
	guests: [],
	events: [],
}

const Event = (state = initialState, action: EventAction): EventState => {
	switch (action.type) {
		case EventActionsEnum.SET_GUESTS:
			return {
				...state,
				guests: action.payload,
			}
		case EventActionsEnum.SET_EVENTS:
			return {
				...state,
				events: action.payload,
			}
		default:
			return state
	}
}

export default Event
