import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Also important
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider } from '@material-tailwind/react';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading = {null} persistor={persistor}>

          {/* <ThemeProvider> */}
            <App />
            <ToastContainer />

          {/* </ThemeProvider> */} 
      </PersistGate>
  
    </Provider>
  </React.StrictMode>
)
