import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';

/* Autenticação de rotas  */
function RouteAuth({ redirectTo, isPrivate, component: Component, ...rest }) {
    const authenticated = sessionStorage.getItem('token');

    if (!authenticated && isPrivate) return <Redirect to={redirectTo} />;

    return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteAuth.propTypes = {
    redirectTo: PropTypes.object,
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteAuth.defaultProps = {
    redirectTo: {
        pathname: "/login",
        state: { blocked: true }
    },
    isPrivate: false,
};

export default RouteAuth;