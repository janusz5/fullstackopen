import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const User = () => {
  const userId = useParams().userId;
  const users = useSelector((state) => state.users);
  if (users.length === 0) return null;
  const user = users.filter((user) => user.id === userId)[0];

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ListGroup>
        {user.blogs.map((blog) => {
          return (
            <ListGroup.Item key={blog.title}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default User;
