import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTodo from './pages/AddTodo';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';

const App = () => {
  return (
      <div className='app-container'>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path={`/login`} element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/addTodo' element={<AddTodo/>}/>
        </Routes>
      </div>
  )
}

export default App
