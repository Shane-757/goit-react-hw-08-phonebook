import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { store } from '../components/Store/Store';
import PhoneApp from '../components/PhoneApp/PhoneApp';
import Navigation from '../components/Navigation/Navigation';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101',
          }}
        >
          <Navigation />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <PrivateRoute path="/contacts" element={<PhoneApp />} />
            <Route path="*" element={<NotFoundRedirect />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('userToken');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Route {...rest} element={Component} /> : null;
};


const NotFoundRedirect = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
};