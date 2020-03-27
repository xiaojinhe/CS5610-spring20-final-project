import React from "react";
import MovieCommentItemComponent from "./MovieCommentItemComponent";

const MovieCommentsListComponent = ({comments}) =>
  <div>
    <div className="container-fluid comment-list">
      {
        comments.map(comment =>
          <MovieCommentItemComponent
            comment={comment}
            key={comment._id}/>
        )
      }
    </div>
  </div>;

export default MovieCommentsListComponent;
