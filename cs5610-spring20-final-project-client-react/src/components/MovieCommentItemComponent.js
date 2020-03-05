import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";

const MovieCommentItemComponent = ({comment, key}) =>
  <div key={key} className="p-2 mt-2 row">
    <div className="col-10">
      <div>
        {/*TODO: Need to change the author to user id*/}
        <Link to={`/users/${comment.author}`}
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
        <small className="pl-2">{comment.date ? comment.date : "03-05-2020"}</small>
      </div>
      <div>{comment.content}</div>
    </div>
  </div>;

export default MovieCommentItemComponent