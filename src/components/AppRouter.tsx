import { Switch, Route, Redirect } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { privateRouts, publicRouts, RouteNames } from '../router'

const AppRouter = () => {
	const { isAuth } = useTypedSelector(({ auth }) => auth)

	return (
		<>
			{isAuth ? (
				<Switch>
					{privateRouts.map((router) => (
						<Route key={router.path} {...router} />
					))}
					<Redirect to={RouteNames.EVENT} />
				</Switch>
			) : (
				<Switch>
					{publicRouts.map((router) => (
						<Route key={router.path} {...router} />
					))}
					<Redirect to={RouteNames.LOGIN} />
				</Switch>
			)}
		</>
	)
}

export default AppRouter
