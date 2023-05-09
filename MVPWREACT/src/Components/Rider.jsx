import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';

const Rider = () => {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3009/api/person/rider')
      .then(response => response.json())
      .then(data => setRiders(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <h1>Riders</h1>
      <Row>
        {riders.map(rider => (
          <Card key={rider.id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{rider.first_name} {rider.last_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{rider.cell_phone}</Card.Subtitle>
              <Card.Text>
                ID: {rider.id} <br />
                Affiliation: {rider.affiliation} <br />
                Arrival Date: {rider.arrival_date} <br />
                Arrival Time: {rider.arrival_time} <br />
                Destination: {rider.destination_id.airport} <br />
              </Card.Text>
              {/* <Button variant="primary">View Details</Button> */}
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Rider;
