import React, { Component } from "react";
import { Card } from "react-bootstrap";
import CommentArea from "./CommentArea";
class SingleBook extends Component {
  // Inizializza lo stato della classe
  state = {
    selected: false, // Un flag che indica se il libro è selezionato o meno
  };

  // Metodo render che restituisce gli elementi da visualizzare nel componente
  render() {
    // Destruttura la prop 'book' dallo stato del componente
    const { book } = this.props;

    // Restituisci l'output del componente
    return (
      <div>
        {/* Componente Card che rappresenta la copertina del libro */}
        <Card
          // Definisci le classi CSS e gli stili in linea della Card
          className="book-cover d-flex flex-column"
          style={{ borderWidth: "2px", borderColor: this.state.selected ? "red" : "rgba(0, 0, 0, 0.175)" }}
          // Gestisci l'evento di click sulla Card per selezionare/deselezionare il libro
          onClick={() => this.setState({ selected: !this.state.selected })}
        >
          {/* Immagine della copertina del libro */}
          <Card.Img variant="top" src={book.img} />
          {/* Titolo del libro */}
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
          </Card.Body>
        </Card>

        {/* Renderizza il componente CommentArea solo se il libro è selezionato */}
        {this.state.selected && <CommentArea asin={book.asin} />}
      </div>
    );
  }
}

// Esporta il componente SingleBook per renderlo disponibile ad altri moduli
export default SingleBook;
