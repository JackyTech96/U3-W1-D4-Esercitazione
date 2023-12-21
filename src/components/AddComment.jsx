import React, { Component } from "react";

class AddComment extends Component {
  state = {
    text: "",
    rating: 1,
    elementId: "",
    isLoading: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: name === "text" ? value.trim() : value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { text, rating, elementId } = this.state;
    const { bookId, fetchComments } = this.props;

    try {
      this.setState({ isLoading: true });

      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDQ2MDBkOGEyMDAwMThhNDhhNTkiLCJpYXQiOjE3MDMxNjgxNDcsImV4cCI6MTcwNDM3Nzc0N30.EiC81RawWqv6MC382sSxNXOBhHki1bByqk6n_r-_m-A",
        },
        body: JSON.stringify({
          comment: text,
          rate: rating,
          elementId: elementId || bookId,
        }),
      });

      if (response.ok) {
        fetchComments(); // Aggiorna la lista delle recensioni dopo l'invio
        this.setState({
          text: "",
          rating: 1,
        });
      } else {
        const errorMessage = await response.text();
        console.error(`Errore nella richiesta POST per aggiungere il commento: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Errore nella richiesta POST per aggiungere il commento", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        <h3>Add a Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="text">Comment:</label>
            <textarea id="text" name="text" value={this.state.text} onChange={this.handleChange} required />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={this.state.rating}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    );
  }
}

export default AddComment;
