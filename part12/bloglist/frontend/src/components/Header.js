import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import { logoutUser } from "../reducers/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar variant="light" bg="light" expand="lg">
      <Navbar.Brand>Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#">
            <Link to="/users">Users</Link>
          </Nav.Link>
        </Nav>
        <Navbar.Text style={{ paddingRight: 7 }}>
          {user.name} is logged in
        </Navbar.Text>
        <Button onClick={logout}>Log Out</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
