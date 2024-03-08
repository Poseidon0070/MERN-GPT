import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainNavigation = () => {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default MainNavigation
