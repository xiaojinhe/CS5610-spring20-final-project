import Rating from "react-rating";
import React from "react";

const MovieRatingFavorComponent = ({rating, voteCount}) =>
  <div>
    <h6 className="movie-header">Rating Score</h6>
    <div className="row">
      <div className="col-3">
        <h3>{rating}</h3>
      </div>
      <div className="col-9 pt-1">
        <Rating fractions={4}
                start={0}
                stop={10}
                step={2}
                initialRating={rating}
                readonly={true}
                fullSymbol={<i className="fas fa-star"/>}
                emptySymbol={<i className="far fa-star"/>}/>
      </div>
    </div>
    <h6 className="movie-header">Total votes: {voteCount}</h6>
    <br/>
    <h6 className="movie-header">Rate this:</h6>
    {/*TODO: Need to add onChange to record the rating*/}
    <div className="mb-2">
      <Rating fractions={4}
              start={0}
              stop={10}
              step={2}
              fullSymbol={<i className="fas fa-star fa-lg"/>}
              emptySymbol={<i className="far fa-star fa-lg"/>}/>
    </div>

    <label htmlFor="favor" className="favor-label pr-2">
      <h6 className="movie-header">Favor this:</h6>
    </label>
    {/*TODO: Need to add onClick to add the movie to user's favorite list*/}
    <button className="btn border-0" id="favor">
      <i className="fas fa-heart fa-2x"/>
    </button>
  </div>;

export default MovieRatingFavorComponent;