import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';

/* Autenticação de rotas  */
function RouteAuth({ redirectTo, isPrivate, component: Component, ...rest }) {
    const authenticated = sessionStorage.getItem('token');

    if (!authenticated && isPrivate) return <Redirect to={redirectTo} />;

    return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteAuth.propTypes = {
    redirectTo: PropTypes.string,
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteAuth.defaultProps = {
    redirectTo: '/login',
    isPrivate: false,
};

export default RouteAuth;