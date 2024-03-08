import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";
import NavigationLink from "./NavigationLink";
import { useAppSelector } from "../store/exporter";

const Header = () => {
  let isLoggedIn = useAppSelector(state => state.isLoggedIn)
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
                // onClick={auth.logout}
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