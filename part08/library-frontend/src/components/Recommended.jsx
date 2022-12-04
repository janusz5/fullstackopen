import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

const Recommended = () => {
  const [favoriteGenre, setFavouriteGenre] = useState(null);
  const meResult = useQuery(ME);
  const bookResult = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre } });

  useEffect(() => {
    if (meResult.data) {
      setFavouriteGenre(meResult.data.me.favouriteGenre);
    }
  }, [meResult.data]); // eslint-disable-line

  if (bookResult.loading) {
    return <div>loading...</div>;
  }
  
  const books = bookResult.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>{favoriteGenre}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
