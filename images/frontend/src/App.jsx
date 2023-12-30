import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Library } from './components/Library';
import { Form } from './components/Form';
import { MangaGenres } from './components/MangaGenres';

function App() {

  return (
    <>
      <Router>
        <div className="w-9/12 m-auto px-2 py-4">
          <div className='w-full py-2'>
            <h1 className='text-3xl text-orange font-display font-bold'>Le Collectif</h1>
            <div className='w-2/12 flex flex-row'>
              <Link to="/" className='flex-auto underline'>Library</Link>
              <Link to="/addManga" className='flex-auto underline'>Add Manga</Link>
            </div>
          </div>
          <Routes>
          <Route path='/' element={
              <div className='w-full mt-8'>
                <Library/>
              </div>}>
          </Route>
          <Route path='/addManga' element={
              <div className='w-full mt-8'>
                <Form/>
              </div>}>
          </Route>
          <Route path='/attrGenres/:id' element={
              <div className='w-full mt-8'>
                <MangaGenres />
              </div>}>
          </Route>
        </Routes>

        </div>
      </Router>
    </>
  )
}

export default App
