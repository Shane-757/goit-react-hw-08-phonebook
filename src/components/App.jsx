import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Define a simple reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    // Define actions here
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

// Define the Registration component
const Registration = () => <h1>Registration</h1>;

// Define the Login component
const Login = () => <h1>Login</h1>;

// Define the PhoneApp component
const PhoneApp = () => <h1>Phone App</h1>;

// Define the App component
const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/phone-app" element={<PhoneApp />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </Provider>
);

export default App;