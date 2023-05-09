import React, { useState, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';

const Rider = () => {
  const [riders, setRiders] = useState([]);
  const [destinations, setDestinations] = useState({});
  
  useEffect(() => {
    fetch('http://localhost:3009/api/person/rider')
      .then(response => response.json())
      .then(data => setRiders(data))
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
                Arrival Date: {new Date(rider.arrival_date).toLocaleDateString('en-CA')} <br />
                Arrival Time: {rider.arrival_time} <br />
                 Destination: {getDestinationName(rider.destination_id)} <br />
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
