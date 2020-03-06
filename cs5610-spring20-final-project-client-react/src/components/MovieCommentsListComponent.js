import React from "react";
import MovieCommentItemComponent from "./MovieCommentItemComponent";

const MovieCommentsListComponent = ({comments}) =>
  <div>
    <div className="container-fluid comment-list">
      {
        // TODO: NEED TO REMOVE THE LIMIT WHEN USING OUR API
        comments.results.filter(comment => comment.content.length < 800).map(comment =>
          <MovieCommentItemComponent
            comment={comment}
            key={comment.id}/>
        )
      }
    </div>
  </div>;

export default MovieCommentsListComponent;