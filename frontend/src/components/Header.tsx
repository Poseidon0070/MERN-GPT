import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";
import NavigationLink from "./NavigationLink";
import { useAppDispatch, useAppSelector } from "../store/exporter";
import axios from "axios";
import { userActions } from "../store/store";
import { toast } from "sonner";

const Header = () => {
  let isLoggedIn = useAppSelector(state => state.isLoggedIn)
  let dispatch = useAppDispatch()

  let logoutHandler = async() => {
    try{
      let response = await axios.get('http://localhost:8080/user/logout', {withCredentials:true})
      
      if(response.status === 200){
        dispatch(userActions.logout())
        toast.success("Logged out successfull")
      }else{
        toast.error("Some error occured! Failed to logout")
          console.log(response.data)
      }
      }catch(err){
        toast.error("Some error occured! Failed to logout")
          throw err
      }
  }
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
            <Logo />
            <div style={{marginLeft : "auto"}}>
          {isLoggedIn ? (
            <>
              <NavigationLink
                to="/chat"
                text="Go To Chat"
              />
              <NavigationLink
                to="/"
                text="logout"
                onClick={logoutHandler}
              />
            </>
          ) : (
            <>
              <NavigationLink
                to="/login"
                text="Login"
              />
              <NavigationLink
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;