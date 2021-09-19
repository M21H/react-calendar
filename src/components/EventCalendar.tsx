import { Calendar } from 'antd'
import { Moment } from 'moment'
import React from 'react'
import { IEvent } from '../models/IEvent'
import { formatDate } from '../utils/data'

interface EventCalendarProps {
	events: IEvent[]
}

const EventCalendar: React.FC<EventCalendarProps> = (props) => {
	function dateCellRender(value: Moment) {
		const formateDate = formatDate(value.toDate())
		const currentDayEvents = props.events.filter((ev) => ev.data === formateDate)

		return (
			<div>
				{currentDayEvents.map((el, index) => (
					<div key={index}>{el.description}</div>
				))}
			</div>
		)
	}

	return <Calendar dateCellRender={dateCellRender} />
}

export default EventCalendar
