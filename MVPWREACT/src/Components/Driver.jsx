import React, { useState, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const [destinations, setDestinations] = useState({});

  useEffect(() => {
    fetch('http://localhost:3009/api/person/driver')
      .then(response => response.json())
      .then(data => setDrivers(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3009/api/destinations')
      .then(response => response.json())
      .then(data => {
        const destMap = {};
        data.forEach(dest => {
          destMap[dest.id] = dest;
        });
        setDestinations(destMap);
      })
      .catch(error => console.log(error));
  }, []);

  const getDestinationName = (destId) => {
    const dest = destinations[destId];
    return dest ? dest.airport : '';
  }

  return (
    <Container className="bg-primary-subtle">
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
                Arrival Date: {new Date(driver.arrival_date).toLocaleDateString('en-CA')} <br />
                Arrival Time: {driver.arrival_time} <br />
                Destination: {getDestinationName(driver.destination_id)} <br />
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Driver;
