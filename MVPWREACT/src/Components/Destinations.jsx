import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3009/api/destinations')
      .then(response => response.json())
      .then(data => setDestinations(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <h1>Destinations Available</h1>
      <Row>
        {destinations.map(destination => (
          <Card key={destination.id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{destination.id} {destination.airport}</Card.Title>
              {/* <Card.Subtitle className="mb-2 text-muted">{rider.cell_phone}</Card.Subtitle>
              <Card.Text>
                ID: {destinations.id} <br />
                // Affiliation: {destination.airport} <br /> */}
            
              {/* </Card.Text> */}
              {/* <Button variant="primary">View Details</Button> */}
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Destinations;
