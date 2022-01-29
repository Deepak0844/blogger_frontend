import { Navbar, Container, Nav } from "react-bootstrap";
import { Menu, Avatar, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user/userAction";

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.data);

  const handleLogoutClose = () => {
    dispatch(logout());
    history.push("/signin");
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClose = () => {
    history.push("/profile");
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Navbar bg="white" sticky="top" expand="md">
      <Container fluid>
        <Navbar.Brand
          onClick={() => history.push("/")}
          style={{ cursor: "pointer" }}
        >
          <b>Blog App</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{
              maxHeight: "100px",
              marginLeft: "auto",
              cursor: "pointer",
            }}
            navbarScroll
          >
            <Navbar.Brand onClick={() => history.push("/")}>Home</Navbar.Brand>
            <Navbar.Brand onClick={() => history.push("/blog")}>
              Blog
            </Navbar.Brand>
            <Navbar.Brand onClick={() => history.push("/create")}>
              Create
            </Navbar.Brand>
          </Nav>
          {!user ? (
            <div>
              <Button color="inherit" onClick={() => history.push("/signin")}>
                <b>Sign In</b>
              </Button>
              <Button color="inherit" onClick={() => history.push("/signup")}>
                <b>Sign Up</b>
              </Button>
            </div>
          ) : (
            /* Profile icon menu */
            <div>
              <Avatar
                onClick={handleMenu}
                style={{ width: 32, height: 32, cursor: "pointer" }}
                alt={user.userName}
                src={user.profilePic ? user.profilePic : ""}
              >
                {user.userName[0]}
              </Avatar>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
