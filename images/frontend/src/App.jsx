import './App.css';
import { Library } from './components/Library';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="w-9/12 m-auto px-2 py-4">
        <div className='w-full py-2'>
          <h1 className='text-3xl text-orange font-display font-bold'>Le Collectif</h1>
        </div>
        <Router>
          <Switch>
            <Route exact path="/">
              <div className='w-full mt-8'>
                <Library/>
              </div>
            </Route>
            <Route exact path="/addManga">
              <div className='w-full mt-8'>
                <Library/>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  )
}

export default App
