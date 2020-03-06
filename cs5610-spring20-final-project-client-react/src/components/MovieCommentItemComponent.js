import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";

const MovieCommentItemComponent = ({comment, isInProfile}) =>
  <div className="mt-2 pb-2 border border-top-0 border-right-0 border-left-0 border-secondary">
    <div>
      {/*TODO: Need to change the author to user id*/}
      <Link to={`/profile/${comment.author}`}
            className="font-weight-bold pr-2">{comment.author}</Link>
      {/*TODO: Need to change to actual comment rating and date*/}
      <Rating fractions={4}
              start={0}
              stop={10}
              step={2}
              initialRating={comment.rating ? comment.rating : 7}
              readonly={true}
              fullSymbol={<i className="fas fa-star"/>}
              emptySymbol={<i className="far fa-star"/>}/>
      <span className="pl-2">{comment.date ? comment.date : "2020-03-05"}</span>
    </div>
    {
      isInProfile &&
      <small>Comment for&nbsp;
        <Link to={`/details/${comment.movie.mid}`}>
          {comment.movie.title}
        </Link>
      </small>
    }
    <div>{comment.content}</div>
  </div>;

export default MovieCommentItemComponent