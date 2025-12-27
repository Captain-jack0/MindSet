import { Provider } from 'react-redux';
import { store } from './store';
import Tree from './components/Tree';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Tree />
    </Provider>
  );
}

export default App;
