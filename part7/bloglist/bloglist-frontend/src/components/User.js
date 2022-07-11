import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = () => {
  const userId = useParams().userId;
  const users = useSelector((state) => state.users);
  if (users.length === 0) return null;
  const user = users.filter((user) => user.id === userId)[0];

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return (
            <li key={blog.title}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;
