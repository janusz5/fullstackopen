import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, { variables: { genre }, fetchPolicy: "cache-and-network" });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const genres = [...new Set(books.reduce((p, c) => [...p, ...c.genres], []))];

  return (
    <div>
      <h2>books</h2>

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
      <div>
        {genre ? (
          <button onClick={() => setGenre(null)}>show all</button>
        ) : (
          <>
            show only genre:
            {genres.map((g) => (
              <button key={g} onClick={() => setGenre(g)}>
                {g}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Books;
