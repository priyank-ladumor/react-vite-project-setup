import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/routes';
import ProtectedRoute from './utils/ProtectedRoute';
import "./style/global.css"

const isAuthenticated = localStorage.getItem("accessToken");

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute isAuth={typeof isAuthenticated === 'string' && isAuthenticated?.length > 0}>
                  {route.element}
                </ProtectedRoute>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
