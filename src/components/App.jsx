import React, { useState } from 'react';
import { Button, Form, Container, Row } from 'react-bootstrap';

function App() {
  const [city, setCity] = useState('');

  return (
    <Container className="w-25 mt-5">
      <Form>
        <Row className="justify-content-center">
          <h2>Weather App</h2>
          <Form.Control
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
            type="text"
            placeholder="Search for a town..."
          ></Form.Control>
          <Button className="mt-2" variant="primary">
            Search
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default App;
