import { BrowserRouter, Route, Routes } from 'react-router-dom'
import logo from './logo.svg';

import { useEffect,useState } from 'react';
import './App.css';

import Home from './Views/Home'
import Login from './Views/Login'
import Register from './Views/Register'
import Main from './Views/Main'
import Records from './Views/Records'


function App() {
  const position = {lat:53.4,lng:10};
  const [open,setOpen] = useState(false)
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element={<Home/>}
          />
          <Route 
            path='/Login'
            element={<Login/>}
          />
          <Route 
            path='/Register'
            element={<Register/>}
          />
          <Route 
            path='/App'
            element={<Main/>}
          />
          <Route 
            path='/Records/:id'
            element={<Records/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
