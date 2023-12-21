import { Col, FormControl, Row } from "react-bootstrap";
import SingleBook from "./SingleBook";
import { Component } from "react";

class BookList extends Component {
  state = {
    searchQuery: "",
  };

  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    return (
      <Row className="g-2">
        <Col xs={12}>
          <FormControl
            type="text"
            placeholder="scrivi il titolo di un libro"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
          {/* this.handleChange(event) */}
        </Col>

        {this.props.booksArray
          .filter((book) => book.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
          .map((book) => (
            <Col xs={12} md={4} key={book.asin}>
              <SingleBook book={book} />
            </Col>
          ))}
      </Row>
    );
  }
}
export default BookList;
