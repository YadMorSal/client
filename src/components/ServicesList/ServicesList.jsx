import ServiceCard from "../ServiceCard/ServiceCard"
import { Col, Row, Container } from "react-bootstrap"
const ServicesList = ({ services }) => {
    return (
        <Container>

            <Row>
                {services.map((service) => (
                    <Col lg={6} xxl={4} key={service._id}>
                        <ServiceCard {...service} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default ServicesList