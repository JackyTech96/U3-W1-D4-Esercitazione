import React, { Component } from "react";

class AddComment extends Component {
  // Inizializza lo stato della componente con i valori di default
  state = {
    text: "", // Contenuto del commento
    rating: 1, // Valutazione del commento, con default a 1
    elementId: "", // ID dell'elemento a cui il commento è associato
    isLoading: false, // Flag per indicare se è in corso una richiesta
  };

  // Gestisce il cambiamento negli input del modulo di inserimento del commento
  handleChange = (e) => {
    const { name, value } = e.target;

    // Aggiorna lo stato con i valori degli input
    this.setState({
      [name]: name === "text" ? value.trim() : value,
      elementId: this.props.bookId, // Imposta l'elementId con l'ID del libro dalla props
    });
  };

  // Gestisce l'invio del modulo di inserimento del commento
  handleSubmit = async (e) => {
    e.preventDefault();

    const { text, rating } = this.state;
    const { bookId, fetchComments } = this.props;

    // Validazione dell'input
    if (text.trim() === "") {
      console.error("Please enter a comment.");
      return;
    }

    if (rating < 1 || rating > 5) {
      console.error("Rating must be between 1 and 5.");
      return;
    }

    try {
      // Imposta il flag di caricamento per indicare l'inizio della richiesta
      this.setState({ isLoading: true });

      // Effettua una richiesta POST al server per aggiungere il commento
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDQ2MDBkOGEyMDAwMThhNDhhNTkiLCJpYXQiOjE3MDMxNjgxNDcsImV4cCI6MTcwNDM3Nzc0N30.EiC81RawWqv6MC382sSxNXOBhHki1bByqk6n_r-_m-A", // Sostituisci con il tuo token di autenticazione
        },
        body: JSON.stringify({
          comment: text,
          rate: rating.toString(),
          elementId: bookId, // Assicura che elementId sia incluso nel corpo della richiesta
        }),
      });

      // Se la richiesta ha avuto successo, aggiorna la lista dei commenti e resetta lo stato
      if (response.ok) {
        fetchComments(); // Aggiorna la lista dei commenti dopo l'invio
        this.setState({
          text: "",
          rating: 1,
        });
      } else {
        // In caso di errore nella richiesta, logga un messaggio di errore
        const errorMessage = await response.text();
        console.error(`Error in the POST request to add the comment: ${errorMessage}`);
      }
    } catch (error) {
      // Gestisce gli errori durante la richiesta
      console.error("Error in the POST request to add the comment", error);
    } finally {
      // Resetta il flag di caricamento al termine della richiesta
      this.setState({ isLoading: false });
    }
  };

  // Renderizza il modulo di inserimento del commento
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

// Esporta la componente AddComment
export default AddComment;
