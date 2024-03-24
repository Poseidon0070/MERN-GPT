import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";
import NavigationLink from "./NavigationLink";
import { useAppDispatch, useAppSelector } from "../store/exporter";
import axios from "axios";
import { userActions } from "../store/store";
import { toast } from "sonner";
import { Box, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import { useLocation } from "react-router-dom";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const Header = () => {
  let isLoggedIn = useAppSelector(state => state.isLoggedIn)
  let dispatch = useAppDispatch()
  let theme = useTheme()
  const location = useLocation();
  const currentPath = location.pathname;
  const isScreenLargerThanMd = useMediaQuery(theme.breakpoints.up('sm'));

  let logoutHandler = async () => {
    try {
      let response = await axios.get('https://mern-gpt-2.onrender.com/user/logout', { withCredentials: true })

      if (response.status === 200) {
        dispatch(userActions.logout())
        toast.success("Logout Successful.")
      } else {
        toast.error("Some error occured! Failed to logout")
        console.log(response.data)
      }
    } catch (err) {
      toast.error("Some error occured! Failed to logout")
      throw err
    }
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const [navbar, setnavbar] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleNavbarMenu = (event: any) => {
    setnavbar(event.currentTarget);
  }

  const handleNavbarClose = () => {
    setnavbar(null);
  }
  return (

    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        {isLoggedIn &&
          <>
            {
              currentPath !== '/' ?
                isScreenLargerThanMd ? <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                  <NavLink to='/chat' className={({ isActive }) => isActive ? 'active' : ''}>
                    <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                      Chat
                    </Typography>
                  </NavLink>
                  <NavLink to='/image' className={({ isActive }) => isActive ? 'active' : ''}>
                    <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                      Generate Image
                    </Typography>
                  </NavLink>
                </Box>
                  :
                  <Box sx={{ marginTop: "12px" }}>
                    <MenuOpenRoundedIcon onClick={handleMenuOpen} fontSize="large" />
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <NavLink to="/chat" style={{ textDecoration: 'none', color: 'black' }}>
                          Chat
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <NavLink to="/image" style={{ textDecoration: 'none', color: 'black' }}>
                          Generate Image
                        </NavLink>
                      </MenuItem>
                    </Menu>
                  </Box> : <></>

            }
            <Box sx={{ display: "hidden" }}></Box>
          </>
        }
        <div style={{}}>
          {isLoggedIn ? (
            <>
              <NavigationLink
                to="/"
                text="logout"
                onClick={logoutHandler}
              />
            </>
          ) : (
            isScreenLargerThanMd ?
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
              :
              <Box>
                <MenuRoundedIcon onClick={handleNavbarMenu} fontSize="large" />
                <Menu
                  anchorEl={navbar}
                  open={Boolean(navbar)}
                  onClose={handleNavbarClose}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleNavbarClose}>
                    <NavLink to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                      Login
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleNavbarClose}>
                    <NavLink to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
                      Signup
                    </NavLink>
                  </MenuItem>
                </Menu>
              </Box>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
