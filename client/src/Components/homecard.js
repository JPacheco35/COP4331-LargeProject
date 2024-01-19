import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

import HomeBar from './/navbar';
import HomeTab from './/hometab';

function HomeCard() 
{
  return (
    <div className="vh-100">
      <Container>
        <Row className="mt-5 justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="square shadow rounded-bottom">
            <div className="border border-5 border-primary rounded-top"></div>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <HomeTab/>
                  <div className="mb-3">
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeCard;