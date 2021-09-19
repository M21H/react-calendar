import { AuthActionCreators } from './auth'
import { EventsActionCreators } from './events'

export const allActionCreators = {
	...AuthActionCreators,
	...EventsActionCreators,
}
