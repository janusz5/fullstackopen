import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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
          return <li key={blog.title}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
