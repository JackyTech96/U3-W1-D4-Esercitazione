import { Col, Row } from "react-bootstrap";
import fantasy from "../data/fantasy.json";
import SingleBook from "./SingleBook";

const AllTheBooks = () => {
  return (
    <Row className="g-2">
      {fantasy.map(book => (
        <Col xs={12} md={4} key={book.asin}>
          <SingleBook book={book} />
        </Col>
      ))}
    </Row>
  );
};

export default AllTheBooks;
