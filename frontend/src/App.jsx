import AppRoutes from '@routes/appRoutes';
import './App.css';
import Provider from './providers';

function App() {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;
