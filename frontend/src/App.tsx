import { Typography } from '@mui/material'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import MainNavigation from './components/MainNavigation'

function App() {

    let router = createBrowserRouter([
        {   
            path : '/',
            element : <MainNavigation />,
            errorElement : <Error />,
            children : [
                {path: '' , element : <Home />}, 
                {path : 'login', element : <Login />}, 
                {path : 'signup', element : <Signup />},
                {path : 'chat', element : <Chat />} 
            ]
        },
    ])
    return (
        <Typography>
            <RouterProvider router={router}></RouterProvider>
        </Typography>
    )
}

export default App