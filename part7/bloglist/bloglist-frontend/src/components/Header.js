import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h1>blogs</h1>
      <div>{user.name} is logged in</div>
      <div>
        <button onClick={logout}>log out</button>
      </div>
    </div>
  );
};

export default Header;
