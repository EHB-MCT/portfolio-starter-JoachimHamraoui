import './App.css';
import { Library } from './components/Library';

function App() {

  return (
    <>
      <div className="w-9/12 m-auto px-2 py-4">
        <div className='w-full py-2'>
          <h1 className='text-3xl text-orange font-display font-bold'>Le Collectif</h1>
        </div>
        <div className='w-full mt-8'>
          <Library/>
        </div>
      </div>
    </>
  )
}

export default App
