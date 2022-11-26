import { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from 'react-select';
import { EDIT_AUTHOR } from "../queries";

const EditAuthorYear = ({authors}) => {
  const [selectedName, setSelectedName] = useState(null);
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const submit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: selectedName.value, setBornTo: born } });

    setSelectedName(null);
    setBorn("");
  };

  const options = authors.map(author => {return {value: author.name, label: author.name}})

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <Select onChange={setSelectedName} options={options}/>
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
