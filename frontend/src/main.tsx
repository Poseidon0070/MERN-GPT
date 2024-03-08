import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import store from './store/store'


let theme = createTheme({
    typography:{
      fontFamily : "Roboto Slab,serif",
        allVariants : {
            color : 'white'
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}> 
        <App />
      </ThemeProvider>
    </Provider> 
  </React.StrictMode>,
)
