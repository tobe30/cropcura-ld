import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
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
      {/* Login route */}
      <Route path='/login' element={<Login/>}/>

      {/* Layout with nested routes */}
      <Route path='/' element={<Layout/>}>
        <Route index element={<Navigate to='/login' />} /> {/* Redirect / to /login */}
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='applications' element={<Applications/>}/>
        <Route path='alerts' element={<Alerts/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='farmers' element={<Farmers/>}/>
      </Route>

      {/* Catch-all for unknown paths */}
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default App
