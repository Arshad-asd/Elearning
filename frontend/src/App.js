import './App.css';
import Home from './Containers/user/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="App">
       <Home />
    </div>
    </Router>
  );
}

export default App;
