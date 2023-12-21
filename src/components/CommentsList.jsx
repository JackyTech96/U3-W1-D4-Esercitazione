import React from "react";
import SingleComment from "./SingleComment";

const CommentsList = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <SingleComment text={comment.comment} />
              {/* Assicurati che la chiave e la proprietà siano corrette a seconda della tua risposta API */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsList;
