import { Button, Calendar, Layout, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEvent } from '../models/IEvent'

const Event: React.FC = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { guests, events } = useTypedSelector(({ event }) => event)
	const { fetchGuests, createEvent, fetchEvents } = useActions()
	const { user } = useTypedSelector(({ auth }) => auth)

	useEffect(() => {
		fetchGuests()
		fetchEvents(user.username)
	}, [])

	const addNewEvent = (event: IEvent) => {
		createEvent(event)
		setIsModalVisible(false)
	}

	const toggleModalVisible = () => {
		setIsModalVisible(!isModalVisible)
	}

	return (
		<Layout>
			<EventCalendar events={events} />
			<Row justify='center'>
				<Button onClick={toggleModalVisible}>Add event</Button>
			</Row>
			<Modal title='Add event' visible={isModalVisible} footer={null} onCancel={toggleModalVisible}>
				<EventForm guests={guests} submit={addNewEvent} />
			</Modal>
		</Layout>
	)
}

export default Event
