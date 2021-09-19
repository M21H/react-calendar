import { Button, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { rules } from '../utils/rules'

const LoginForm: React.FC = () => {
	const { isLoading, error } = useTypedSelector(({ auth }) => auth)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const { login } = useActions()

	const onFinish = () => {
		login(username, password)
	}

	const onFinishFailed = () => {}

	return (
		<Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
			<Form.Item label='Username' name='username' rules={[rules.required('Please input your username!')]}>
				<Input onChange={(e) => setUsername(e.target.value)} value={username} />
			</Form.Item>

			<Form.Item label='Password' name='password' rules={[rules.required('Please input your password!')]}>
				<Input.Password onChange={(e) => setPassword(e.target.value)} value={password} />
			</Form.Item>

			{error && <div style={{ color: 'red' }}>{error}</div>}

			<Row justify='end'>
				<Button type='primary' htmlType='submit' loading={isLoading}>
					Login
				</Button>
			</Row>
		</Form>
	)
}

export default LoginForm
