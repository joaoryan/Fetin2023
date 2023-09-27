import React from 'react'
import './index.css'
import ProviderWrapper from './components/ProviderWrapper/index'
import 'react-toastify/dist/ReactToastify.min.css';
import AppRoutes from './routes'
import "./index.css";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <ProviderWrapper >
      <AppRoutes />
      <ToastContainer
        position='top-center'
        hideProgressBar
        closeButton={false}
      />
    </ProviderWrapper>
  )
}

export default App;
