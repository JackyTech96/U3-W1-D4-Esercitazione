// Importa la libreria React dal pacchetto "react"
import React from "react";

// Definizione della componente funzionale SingleComment
const SingleComment = ({ text }) => {
  // Restituisce l'elemento JSX che rappresenta il singolo commento
  return (
    <div>
      {/* Utilizza un paragrafo (p) per visualizzare il testo del commento */}
      <p>{text}</p>
    </div>
  );
};

// Esporta la componente SingleComment per renderla disponibile ad altri moduli
export default SingleComment;
