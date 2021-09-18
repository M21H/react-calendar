import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreator } from '../store/reducers/action-creater'
import { rules } from '../utils/rules'

const LoginForm: React.FC = () => {
	const dispatch = useDispatch()

	const onFinish = () => {
    dispatch(ActionCreator.login('admin', '1234'))
  }

	const onFinishFailed = () => {}

	return (
		<Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
			<Form.Item label='Username' name='username' rules={[rules.required('Please input your username!')]}>
				<Input />
			</Form.Item>

			<Form.Item label='Password' name='password' rules={[rules.required('Please input your password!')]}>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name='remember'
				valuePropName='checked'
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type='primary' htmlType='submit'>
					Login
				</Button>
			</Form.Item>
		</Form>
	)
}

export default LoginForm
