import './App.css'
import { Grid } from './components/grid/Grid';
import { Route, Routes } from 'react-router-dom';
import { Pivot } from './components/pivot/Pivot';

function App() {
  return <Routes>
    <Route path={'/'} element={<span>Hello World!</span>}/>
    <Route path={'/grid'} element={<Grid/>}/>
    <Route path={'/pivot'} element={<Pivot/>}/>
  </Routes>
}

export default App
