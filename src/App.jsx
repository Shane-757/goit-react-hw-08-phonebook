import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/Store/Store'; 
import PhoneApp from './Pages/PhoneApp/PhoneApp';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>  
        <ChakraProvider>
          <Router>
            <div>
              <Navigation />
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contacts" element={<PrivateRoute><PhoneApp /></PrivateRoute>} />
              </Routes>
            </div>
          </Router>
        </ChakraProvider>
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



