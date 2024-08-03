import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import authServices from './services/authManager'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authServices.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout());
      }
    })
    .catch()
    .finally(() => setLoading(false));

  }, []);

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="w-full">
        <Header />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
