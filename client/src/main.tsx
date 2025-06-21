import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import store from '@/utils/redux/store.ts'
import { Provider as ReduxProvider } from 'react-redux'
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ReduxProvider store={store}>
         <Toaster/>
         <App />
      </ReduxProvider>
   </StrictMode>,
)
