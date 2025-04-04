import React from "react";
import { Col, Card, Button } from "react-bootstrap";

const ServiceCard = ({ title, description, imgUrl }) => {
  return (
    <Col md={6} lg={3} className="mb-4">
      <Card className="shadow">
        <Card.Img variant="top" src={imgUrl} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary" href="/customer/services">
            Learn More
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ServiceCard;
