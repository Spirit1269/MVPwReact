import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Create = ({ handleCreateClick }) => {
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    cell_phone: "",
    affiliation: "",
    position: "",
    arrival_date: "",
    arrival_time: "",
    destination_id: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3009/api/destinations")
      .then(response => response.json())
      .then((data) => {
        setDestinations(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3009/api/person", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        destination_id: parseInt(formData.destination_id),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setIsSuccess(true);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFormData({
          last_name: "",
          first_name: "",
          cell_phone: "",
          affiliation: "",
          position: "",
          arrival_date: "",
          arrival_time: "",
          destination_id: "",
        });
        handleCreateClick(); // call the parent component's callback to close the modal
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {isSuccess && <Alert variant="success">Person added successfully</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="cell_phone">
          <Form.Label>Cell Phone</Form.Label>
          <Form.Control
            type="text"
            name="cell_phone"
            value={formData.cell_phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="affiliation">
          <Form.Label>Affiliation</Form.Label>
          <Form.Control
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="position">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="arrival_date">
          <Form.Label>Arrival Date</Form.Label>
          <Form.Control
            type="date"
            name="arrival_date"
            value={formData.arrival_date}
            onChange={handleChange}
          />
        </Form.Group>
      <Form.Group controlId="arrival_time">
        <Form.Label>Arrival Time</Form.Label>
        <Form.Control
          type="time"
          name="arrival_time"
          value={formData.arrival_time}
          onChange={handleChange}
        />
      </Form.Group>
    
      <Form.Group controlId="destination_id">
        <Form.Label>Destination</Form.Label>
        <Form.Control
            as="select"
            name="destination_id"
            value={formData.destination_id}
            onChange={handleChange}
        >
            <option value="">Select a destination</option>
            {destinations.map(destination => (
            <option key={destination.id} value={destination.id}>{destination.airport}</option>
                ))}
        </Form.Control>
    </Form.Group>
       
      <Button type="submit">Submit</Button>
    </Form>
    </>
  )
 }
export default Create;
