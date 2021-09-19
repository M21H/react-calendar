import React, { useState } from 'react'
import { Button, DatePicker, Form, Input, Row, Select } from 'antd'
import { rules } from '../utils/rules'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IUser } from '../models/IUser'
import { IEvent } from '../models/IEvent'
import { Moment } from 'moment'
import { formatDate } from '../utils/data'

interface EventFormProps {
	guests: IUser[]
	submit: (event: IEvent) => void
}

const EventForm: React.FC<EventFormProps> = (props) => {
	const { isLoading, user } = useTypedSelector(({ auth }) => auth)
	const [event, setEvent] = useState<IEvent>({
		author: '',
		data: '',
		description: '',
		guest: '',
	} as IEvent)

	const submitForm = () => {
		props.submit({ ...event, author: user.username })
	}

	const selectDate = (data: Moment | null) => {
		if (data) {
			setEvent({ ...event, data: formatDate(data?.toDate()) })
		}
	}

	return (
		<Form onFinish={submitForm}>
			<Form.Item label='Description of event' name='description' rules={[rules.required()]}>
				<Input value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
			</Form.Item>
			<Form.Item
				label='Data of event'
				name='date'
				rules={[rules.required(), rules.isDateAfter('you cannot create event in the past')]}>
				<DatePicker onChange={(date) => selectDate(date)} />
			</Form.Item>
			<Form.Item label='Choose user' name='guest' rules={[rules.required()]}>
				<Select onChange={(guest: string) => setEvent({ ...event, guest })}>
					{props.guests.map((guest) => (
						<Select.Option key={guest.username} value={guest.username}>
							{guest.username}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Row justify='end'>
				<Button type='primary' htmlType='submit' loading={isLoading}>
					Submit
				</Button>
			</Row>
		</Form>
	)
}

export default EventForm
