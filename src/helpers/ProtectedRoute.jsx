import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAuth, children }) => {
    console.log('✌️isAuth --->', isAuth);
    return isAuth ? children : <Navigate to="/" replace />;
};

ProtectedRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
