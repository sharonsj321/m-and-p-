import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div className="about-us bg-light py-5">
      <Container>
        {/* Section 1: About Company */}
        <section className="text-center mb-5">
          <h2 className="mb-3 fw-bold text-primary">About Movers and Packers</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            We are a trusted name in the logistics and shifting industry,
            providing reliable and efficient moving solutions. With years of
            experience, we ensure a hassle-free and secure relocation process
            for homes and businesses.
          </p>
        </section>

        {/* Section 2: Mission & Vision */}
        <section className="mission-vision mb-5">
          <Row>
            <Col md={6}>
              <Card className="shadow mb-4 border-0">
                <Card.Body className="text-center">
                  <h4 className="text-primary fw-bold">🎯 Our Mission</h4>
                  <p className="text-muted">
                    To provide safe, reliable, and affordable shifting services
                    across India. We aim to make the relocation process smooth
                    and stress-free for our customers.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow border-0">
                <Card.Body className="text-center">
                  <h4 className="text-primary fw-bold">🚀 Our Vision</h4>
                  <p className="text-muted">
                    To be the most trusted movers and packers company with a
                    strong presence across multiple cities. We aspire to deliver
                    excellence through innovation and customer satisfaction.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Section 3: Our Team */}
        <section className="our-team text-center mb-5">
          <h2 className="mb-4 fw-bold text-primary">🤝 Meet Our Team</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="shadow border-0">
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/150"
                  alt="John Doe"
                  className="rounded-circle mx-auto mt-4"
                  style={{ width: "100px", height: "100px" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">John Doe</Card.Title>
                  <Card.Text className="text-muted">Founder & CEO</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="shadow border-0">
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/150"
                  alt="Jane Smith"
                  className="rounded-circle mx-auto mt-4"
                  style={{ width: "100px", height: "100px" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Jane Smith</Card.Title>
                  <Card.Text className="text-muted">Operations Manager</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="shadow border-0">
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/150"
                  alt="Michael Johnson"
                  className="rounded-circle mx-auto mt-4"
                  style={{ width: "100px", height: "100px" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">Michael Johnson</Card.Title>
                  <Card.Text className="text-muted">Logistics Head</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Section 4: CTA Section */}
        <section className="text-center">
          <h3 className="fw-bold text-primary mb-3">📞 Ready to Move? Get in Touch with Us!</h3>
          <p className="text-muted">
            Contact us now to schedule your relocation with the best movers in
            the industry.
          </p>
       
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;
