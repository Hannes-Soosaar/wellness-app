import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import Login from './pages/Login'

const App: React.FC = () => {
  return (
    <div className = "container">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App