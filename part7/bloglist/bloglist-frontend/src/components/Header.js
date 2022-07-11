import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logoutUser());
  };

  const padding = {
    paddingRight: 10,
  };

  const menuStyle = {
    backgroundColor: "lightgrey",
    fontSize: "1.1em",
  };

  return (
    <div>
      <div style={menuStyle}>
        <Link to="/" style={padding}>
          Blogs
        </Link>
        <Link to="/users" style={padding}>
          Users
        </Link>
        <span style={{ paddingRight: 4 }}>{user.name} is logged in</span>
        <button onClick={logout}>log out</button>
      </div>
      <h1>Blog App</h1>
    </div>
  );
};

export default Header;
