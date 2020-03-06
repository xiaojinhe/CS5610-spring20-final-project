import React from "react";
import MovieCommentItemComponent from "./MovieCommentItemComponent";

const MovieCommentsListComponent = ({comments}) =>
  <div>
    <div className="container-fluid comment-list">
      {
        comments.results.map(comment => {
          // TODO: NEED TO REMOVE THE LIMIT WHEN USING OUR API
          if (comment.content.length < 800) {
            return <MovieCommentItemComponent
              comment={comment}
              key={comment.id}/>
          }
        })
      }
    </div>
  </div>;

export default MovieCommentsListComponent;