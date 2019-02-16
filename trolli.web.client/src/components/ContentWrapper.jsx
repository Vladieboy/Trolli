import React from "react";
import { Row, Col } from "reactstrap";

export default function ContentWrapper({ children }) {
  return (
    <Row className="d-flex m-0">
      <Col md={6} className="mx-auto">
        {children}
      </Col>
    </Row>
  );
}
