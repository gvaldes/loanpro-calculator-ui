import logo from './logo.svg';
import './App.css';
import RandomComponent from './components/RandomComponent/RandomComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalculatorComponent from './components/CalculatorComponent/CalculatorComponent';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <RandomComponent></RandomComponent>

        <CalculatorComponent></CalculatorComponent>

      </header>
    </div>
  );
}

export default App;
