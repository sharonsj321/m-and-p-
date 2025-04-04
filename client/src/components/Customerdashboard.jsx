import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Services from "./Services";
import Testimonials from "./Testimonials";
import { Link } from "react-router-dom"; // ✅ Import Link

const services = [
  {
    title: "Domestic Shifting",
    description: "Shift your home safely within the city.",
    imgUrl:
      "https://5.imimg.com/data5/SELLER/Default/2023/11/362972309/DG/SP/EU/189025172/domestic-shifting-services-500x500.jpg",
  },
  {
    title: "Car Shifting",
    description: "Relocate your vehicle securely.",
    imgUrl:
      "https://www.agarwalpackers.com/media/images/cache/agarwal_packers_car_moving_png_0_0_cover_70.jpg",
  },
  {
    title: "House Shifting",
    description: "Hassle-free house shifting services.",
    imgUrl: "https://www.thetransporter.in/img/main/house-4.jpg",
  },
  {
    title: "Office Shifting",
    description: "Efficient and quick office relocation.",
    imgUrl: "https://jjmetro.com/wp-content/uploads/2013/01/Orlando-office-moving.jpg",
  },
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5">
        <Container>
          <h1 className="display-4 fw-bold">Welcome to Movers and Packers</h1>
          <p className="lead mb-4">
            Safe, reliable, and affordable shifting solutions.
          </p>
          <Link to="/services">
            <Button variant="light" size="lg" className="px-4">
              Explore Services
            </Button>
          </Link>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">🚚 Our Services</h2>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="shadow-lg rounded">
                  <Card.Img
                    variant="top"
                    src={service.imgUrl}
                    alt={service.title}
                    className="service-img"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold">{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    <Link to={`/services/${service.title.toLowerCase()}`}>
                     
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works bg-white py-5">
        <Container>
          <h2 className="text-center mb-5">⚙️ How It Works</h2>
          <Row className="text-center">
            <Col md={4}>
              <div className="step-box shadow-sm p-4 mb-4 rounded">
                <h5>1. Book Your Service</h5>
                <p className="text-muted">
                  Select your desired service and schedule your shift.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="step-box shadow-sm p-4 mb-4 rounded">
                <h5>2. Safe Packing</h5>
                <p className="text-muted">
                  Our team ensures secure packing and handling.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="step-box shadow-sm p-4 mb-4 rounded">
                <h5>3. On-time Delivery</h5>
                <p className="text-muted">
                  Your goods are delivered on time without any hassle.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">💬 What Our Customers Say</h2>
          <Testimonials />
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2025 Movers and Packers. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Home;
