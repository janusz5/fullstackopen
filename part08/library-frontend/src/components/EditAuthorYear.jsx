import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries";

const EditAuthorYear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const submit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          id="name"
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
        ></input><br />
        <label htmlFor="born">Birthyear:</label>
        <input
          name="born"
          id="born"
          type="number"
          value={born}
          onChange={({ target }) => setBorn(Number(target.value))}
        ></input><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditAuthorYear;
