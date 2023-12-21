// Importa React e Component dalla libreria React
import React, { Component } from "react";

// Importa i componenti CommentsList e AddComment dal relativo percorso
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

// Definisci la classe CommentArea che estende da Component
class CommentArea extends Component {
  // Inizializza lo stato della classe
  state = {
    comments: [], // Un array vuoto che conterrà i commenti
  };

  // Metodo chiamato automaticamente dopo che il componente è stato montato
  componentDidMount() {
    // Chiama il metodo fetchComments per ottenere i commenti dal server
    this.fetchComments();
  }

  // Metodo asincrono per ottenere i commenti dal server
  fetchComments = async () => {
    try {
      // Invia una richiesta GET al server per ottenere i commenti relativi a un libro (specificato da this.props.asin)
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDQ2MDBkOGEyMDAwMThhNDhhNTkiLCJpYXQiOjE3MDMxNjgxNDcsImV4cCI6MTcwNDM3Nzc0N30.EiC81RawWqv6MC382sSxNXOBhHki1bByqk6n_r-_m-A", // Token di autenticazione (da sostituire con il tuo)
        },
      });

      // Verifica se la risposta è OK (status code 200)
      if (response.ok) {
        // Estrai i dati JSON dalla risposta
        const comments = await response.json();
        // Aggiorna lo stato della classe con i commenti ottenuti
        this.setState({ comments });
      } else {
        // Se la risposta non è OK, stampa un errore nella console
        console.error("Errore nel fetch delle recensioni");
      }
    } catch (error) {
      // Se si verifica un errore durante la richiesta, stampa un errore nella console
      console.error("Errore nel fetch delle recensioni", error);
    }
  };

  // Metodo render che restituisce gli elementi da visualizzare nel componente
  render() {
    return (
      <div>
        {/* Renderizza il componente CommentsList e passa i commenti come props */}
        <CommentsList comments={this.state.comments} />

        {/* Renderizza il componente AddComment e passa la funzione fetchComments come props */}
        <AddComment bookId={this.props.asin} fetchComments={this.fetchComments} />
      </div>
    );
  }
}

// Esporta il componente CommentArea per renderlo disponibile ad altri moduli
export default CommentArea;
