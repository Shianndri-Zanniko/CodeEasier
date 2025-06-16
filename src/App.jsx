import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/app/Dashboard';
import Courses from './pages/app/Courses';
import Profile from './pages/app/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CourseDetail from './pages/app/CourseDetail';
import GlobalNotes from './pages/GlobalNotes';
import CompleteProfile from './pages/auth/CompleteProfile';
import Achievements from './pages/Achievements';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/forgot-password' element={<ForgotPassword />}/>
      <Route path='/complete-profile' element={<CompleteProfile />} />

      {/* Protected Routes */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/courses'
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />
      <Route
        path='/courses/:id'
        element={
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/notes'
        element={
          <ProtectedRoute>
            <GlobalNotes />
          </ProtectedRoute>
        }
      />
      <Route
        path='/achievements'
        element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App
