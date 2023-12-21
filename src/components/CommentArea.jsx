import React, { Component } from "react";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

class CommentArea extends Component {
  state = {
    comments: [],
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDQ2MDBkOGEyMDAwMThhNDhhNTkiLCJpYXQiOjE3MDMxNjgxNDcsImV4cCI6MTcwNDM3Nzc0N30.EiC81RawWqv6MC382sSxNXOBhHki1bByqk6n_r-_m-A", // Aggiungi il tuo token di autenticazione
        },
      });

      if (response.ok) {
        const comments = await response.json();
        this.setState({ comments });
      } else {
        console.error("Errore nel fetch delle recensioni");
      }
    } catch (error) {
      console.error("Errore nel fetch delle recensioni", error);
    }
  };

  render() {
    return (
      <div>
        {/* Renderizza il componente CommentsList e passa i commenti come props */}
        <CommentsList comments={this.state.comments} />

        {/* Renderizza il componente AddComment e passa la funzione fetchComments come props */}
        <AddComment fetchComments={this.fetchComments} />
      </div>
    );
  }
}

export default CommentArea;
