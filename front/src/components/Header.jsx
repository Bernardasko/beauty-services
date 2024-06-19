import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CssBaseline from "@mui/material/CssBaseline";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";
import { logout, getLogedInUser } from "../utils/auth/authenticate";
import { useState, useEffect } from "react";

export default function ButtonAppBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLogedInUser();
    setLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/");
  };

  const users = getLogedInUser();

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/" style={{  color: "inherit" }}>
            <HomeIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" >
          <Button
            id="basic-button"
            aria-controls={menuAnchorEl ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuAnchorEl ? 'true' : undefined}
            onClick={handleMenuClick}
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
          >
            Menu 
          </Button>
          </Typography>
          <Menu
            id="basic-menu"
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/">Home</MenuItem>
            <MenuItem component={Link} to="/my-beauties">My Beauty</MenuItem>
          </Menu>
          </Typography>
          <Typography variant="h6" component="div" sx={{ ml: 2 }}>
            {users?.data.role}
          </Typography>
          {loggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit">
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
