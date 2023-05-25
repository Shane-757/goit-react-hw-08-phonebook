import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../components/Store/Store'; 
import PhoneApp from '../components/PhoneApp/PhoneApp';
import Navigation from '../components/Navigation/Navigation';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>  
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
              <Route path="/contacts" element={<PrivateRoute><PhoneApp /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </PersistGate>  
    </Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('userToken');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};




