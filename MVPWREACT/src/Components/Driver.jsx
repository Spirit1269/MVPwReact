import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';

const Driver = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3009/api/person/driver')
      .then(response => response.json())
      .then(data => setDrivers(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <h1>Drivers</h1>
      <Row>
        {drivers.map(driver => (
          <Card key={driver.id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{driver.first_name} {driver.last_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{driver.cell_phone}</Card.Subtitle>
              <Card.Text>
                ID: {driver.id} <br />
                Affiliation: {driver.affiliation} <br />
                Arrival Date: {driver.arrival_date} <br />
                Arrival Time: {driver.arrival_time} <br />
                Destination ID: {driver.destination_id.airport} <br />
              </Card.Text>
              {/* <Button variant="primary">View Details</Button> */}
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Driver;
