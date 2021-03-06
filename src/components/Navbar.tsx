import React from 'react'
import { Layout, Menu, Row } from 'antd'
import { useHistory } from 'react-router-dom'
import { RouteNames } from '../router'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'

const Navbar: React.FC = () => {
	const history = useHistory()
	const { logout } = useActions()
	const { isAuth, user } = useTypedSelector(({ auth }) => auth)

	return (
		<Layout.Header>
			<Row justify='end'>
				{isAuth ? (
					<>
						<div style={{ color: 'red', padding: '0 20px' }}>{user.username}</div>
						<Menu theme='dark' mode='horizontal' selectable={false}>
							<Menu.Item key={1} onClick={() => logout()}>
								logout
							</Menu.Item>
						</Menu>
					</>
				) : (
					<Menu theme='dark' mode='horizontal' selectable={false}>
						<Menu.Item key={2} onClick={() => history.push(RouteNames.LOGIN)}>
							login
						</Menu.Item>
					</Menu>
				)}
			</Row>
		</Layout.Header>
	)
}

export default Navbar
