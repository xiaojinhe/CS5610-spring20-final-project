import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";
import {TMDB_IMAGE_URL} from "../common/constants";

const MovieCommentItemComponent = ({comment, isInProfile, isHomePage}) =>
  <div className="mt-2 p-2 border-secondary">
    <div className="row">
      {
        (isInProfile || isHomePage) &&
        <div className={`${isHomePage ? 'col-3' : 'col-2'} pr-0`}>
          <Link to={`/details/${comment.tmdbId}`}>
            <img src={TMDB_IMAGE_URL(200, comment.moviePosterURL)}
                 alt="Poster"
                 className="img-thumbnail"
            />
          </Link>
        </div>
      }
      <div className={`${isHomePage ? 'col-9' : 'col-10'}`}>
        <div>
          {isInProfile || isHomePage ?
            <div>
              <Link to={`/details/${comment.tmdbId}`}
                    className="font-weight-bold pr-2">
                {comment.movieName}
              </Link>
            </div>
            :
            <Link to={`/profile/${comment.userId}`}
                  className="font-weight-bold pr-2">
              {comment.username}
            </Link>
          }
          <Rating fractions={4}
                  start={0}
                  stop={10}
                  step={2}
                  initialRating={comment.rating ? comment.rating : 7}
                  readonly={true}
                  fullSymbol={<i className="fas fa-star"/>}
                  emptySymbol={<i className="far fa-star"/>}/>
          {isHomePage ?
            <div>{comment.date && comment.date.substring(0, 10)}</div> :
            <span className="pl-2">{comment.date && comment.date.substring(0, 10)}</span>
          }
        </div>
        <div>{comment.content}</div>
      </div>
    </div>
  </div>;

export default MovieCommentItemComponent
