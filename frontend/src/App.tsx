import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Login, { loginAction } from './pages/Login'
import Signup, { SignupAction } from './pages/Signup'
import Chat from './pages/Chat'
import MainNavigation from './components/MainNavigation'
import { useEffect } from 'react'
import axios from 'axios'
import { useAppDispatch } from './store/exporter'
import { userActions } from './store/store'

function App() {
    let dispatch = useAppDispatch()
    useEffect(() => {
        const verifyUser = async () => {
          try {
            const response = await axios.get('http://localhost:8080/user/verify', {withCredentials:true});
            if(response){
                let userData = response.data.user
                dispatch(userActions.login({ name: userData.name, email: userData.email }))
            }
          } catch (error) {
            console.log(error)
          }
        };
    
        verifyUser();
     }, []);

    let router = createBrowserRouter([
        {   
            path : '/',
            element : <MainNavigation />,
            errorElement : <Error />,
            children : [
                {path: '' , element : <Home />}, 
                {path : 'login', element : <Login />, action: loginAction}, 
                {path : 'signup', element : <Signup />, action: SignupAction},
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