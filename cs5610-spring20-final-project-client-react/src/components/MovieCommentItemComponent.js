import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";
import {TMDB_IMAGE_URL} from "../common/constants";

const MovieCommentItemComponent = ({comment, isInProfile}) =>
  <div className="mt-2 pb-2 border border-top-0 border-right-0 border-left-0 border-secondary">
    <div className="row">
      {
        isInProfile &&
        <div className="col-1 pr-0 ml-1">
          <Link to={`/details/${comment.tmdbId}`}>
            <img src={TMDB_IMAGE_URL(200, comment.movie.moviePosterURL)}
                 alt="Poster"
                 className="img-thumbnail"
                 height="120"
                 width="80"
            />
          </Link>
        </div>
      }
      <div className="col-10">
        <div>
          {/*TODO: Need to change the author to user id*/}
          {
            isInProfile ?
              <div>
                <Link to={`/details/${comment.tmdbId}`}
                      className="font-weight-bold pr-2">
                  {comment.movieName}
                </Link>
              </div>
              :
              <Link to={`/profile/${comment.username}`}
                    className="font-weight-bold pr-2">
                {comment.username}
              </Link>
          }
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
        <div>{comment.content}</div>
      </div>
    </div>
  </div>;

export default MovieCommentItemComponent
