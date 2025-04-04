// src/components/Services.jsx
import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Services.css"; // ✅ Import custom CSS

// ✅ Correct services list
const services = [
  {
    id: 1,
    name: "Domestic Shifting",
    description: "Shift hassle-free within the city.",
    link: "/services/domestic-shift",
    imgUrl:
    "https://5.imimg.com/data5/SELLER/Default/2023/11/362972309/DG/SP/EU/189025172/domestic-shifting-services-500x500.jpg",
  },
  {
    id: 2,
    name: "Car Shifting",
    description: "Safe and secure car relocation.",
    link: "/services/car-shift",
    imgUrl:
    "https://www.agarwalpackers.com/media/images/cache/agarwal_packers_car_moving_png_0_0_cover_70.jpg",
  },
  {
    id: 3,
    name: "House Shifting",
    description: "Relocate your home easily.",
    link: "/services/house-shift",
    imgUrl:
"https://www.thetransporter.in/img/main/house-4.jpg",  },
  {
    id: 4,
    name: "Office Shifting",
    description: "Efficient office relocations.",
    link: "/services/office-shift",
    imgUrl:
"https://jjmetro.com/wp-content/uploads/2013/01/Orlando-office-moving.jpg",  },
];

const Services = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        🚚 Our Top Services
      </h2>
      <Row className="g-4">
        {services.map((service) => (
          <Col md={6} lg={3} key={service.id}>
            <Link
              to={service.link}
              className="service-link" // ✅ Apply custom CSS class
            >
              <Card className="service-card shadow-lg">
                <Card.Img
                  variant="top"
                  src={service.imgUrl}
                  className="service-img"
                />
                <Card.Body>
                  <Card.Title className="service-title">
                    {service.name}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {service.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Services;
