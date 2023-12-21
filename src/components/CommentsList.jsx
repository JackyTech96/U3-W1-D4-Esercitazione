import React from "react";
import SingleComment from "./SingleComment";

// Definisci il componente funzionale CommentsList che accetta la prop 'comments'
const CommentsList = ({ comments }) => {
  // Restituisci gli elementi da visualizzare nel componente
  return (
    <div>
      {/* Intestazione per la sezione dei commenti */}
      <h3>Comments</h3>
      {/* Condizione: se non ci sono commenti, visualizza un messaggio, altrimenti, mostra la lista dei commenti */}
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        // Lista non ordinata contenente i singoli commenti
        <ul>
          {/* Mappa attraverso la lista dei commenti e crea un elemento per ciascun commento */}
          {comments.map((comment) => (
            <li key={comment._id}>
              {/* Renderizza il componente SingleComment e passa il testo del commento come prop */}
              <SingleComment text={comment.comment} />
              {/* Assicurati che il nome della proprietà corrisponda alla struttura del tuo oggetto commento */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsList;
