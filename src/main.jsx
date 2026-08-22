import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const root = document.getElementById("root")

if (!root) {
  throw new Error("Root element not found")
}

createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <App />

      <ToastContainer 
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </AuthProvider>
  </BrowserRouter>
)
