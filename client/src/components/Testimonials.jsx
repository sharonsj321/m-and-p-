import React from "react";
import { Carousel } from "react-bootstrap";

const Testimonials = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="text-center p-4">
          <p>"Movers and Packers made my shifting so smooth and easy. Highly recommended!"</p>
          <h5>- John Doe</h5>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-center p-4">
          <p>"Excellent service and on-time delivery. I am very satisfied!"</p>
          <h5>- Jane Smith</h5>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="text-center p-4">
          <p>"Reliable and trustworthy team. They handled everything with care!"</p>
          <h5>- David Wilson</h5>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Testimonials;
