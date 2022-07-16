import logo from './logo.svg';
import './App.css';
// import BCom from './components/BCom';
import BCom from './container'

import ACom from './components/ACom';
import { Provider } from 'react-redux';
import store from './store'
function App() {
  return (
    <Provider store={store}>
        <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ACom></ACom>
        <BCom></BCom>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </Provider>
  );
}

export default App;
