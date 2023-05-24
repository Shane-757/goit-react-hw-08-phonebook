import { Provider } from 'react-redux';
import { store } from '../components/Store/Store';
import PhoneApp from './PhoneApp/PhoneApp';

export const App = () => {
  return (
    <Provider store={store}>
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
          <PhoneApp />
        </div>
    </Provider>
  );
};