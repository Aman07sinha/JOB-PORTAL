import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Also important
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider } from '@material-tailwind/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <ThemeProvider>
      <App />
      <ToastContainer />

    </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
