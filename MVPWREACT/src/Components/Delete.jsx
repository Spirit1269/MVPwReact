import React, { useState } from "react";

const Delete = () => {
  const [id, setId] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3009/api/person/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setSuccess(true);
        return response.json();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <div className="form-group">
        <label htmlFor="idInput">Enter ID to delete:</label>
        <input
          type="text"
          className="form-control"
          id="idInput"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      {success && <div>Item deleted successfully!</div>}
    </div>
  );
};

export default Delete;
