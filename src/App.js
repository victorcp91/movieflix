import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <Home />
          </div>
        </Route>
        <Route path="/movie/:id" exact>
          <div className="App">
            <Movie />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
