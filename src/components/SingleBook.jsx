import React, { Component } from "react";
import { Card } from "react-bootstrap";
import CommentArea from "./CommentArea";

class SingleBook extends Component {
  state = {
    selected: false,
  };

  render() {
    const { book } = this.props;

    return (
      <div>
        <Card
          className="book-cover d-flex flex-column"
          style={{ borderWidth: "2px", borderColor: this.state.selected ? "red" : "rgba(0, 0, 0, 0.175)" }}
          onClick={() => this.setState({ selected: !this.state.selected })}
        >
          <Card.Img variant="top" src={book.img} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
          </Card.Body>
        </Card>

        {this.state.selected && <CommentArea asin={book.asin} />}
      </div>
    );
  }
}

export default SingleBook;
