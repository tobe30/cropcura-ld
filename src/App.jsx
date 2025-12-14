import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import Applications from './pages/Applications'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import Farmers from './pages/Farmers'

const App = () => {
  return (
    <Routes>
      {/* Define your routes here */}

      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Layout/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='applications' element={<Applications/>}/>
        <Route path='alerts' element={<Alerts/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='farmers' element={<Farmers/>}/>

      
      </Route>

    </Routes>
  )
}

export default App