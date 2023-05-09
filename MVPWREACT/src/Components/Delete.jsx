import React, { useState } from "react";

const Delete = () => {
  const [id, setId] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDelete = () => {
    fetch(`http://localhost:3009/api/person/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Delete Item</h2>
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