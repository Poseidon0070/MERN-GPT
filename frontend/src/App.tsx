import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import MainNavigation from './components/MainNavigation'
import { SignupAction } from './pages/Signup.tsx'

function App() {

    let router = createBrowserRouter([
        {   
            path : '/',
            element : <MainNavigation />,
            errorElement : <Error />,
            children : [
                {path: '' , element : <Home />}, 
                {path : 'login', element : <Login />}, 
                {path : 'signup', element : <Signup />, action : SignupAction},
                {path : 'chat', element : <Chat />} 
            ]
        },
    ])
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

export default App

//response.data is not a function; it's a property that holds the data of the response (in axios)