import React from 'react'
import {TMDB_IMAGE_URL} from "../../common/constants";
import {Link} from "react-router-dom";
import Rating from "react-rating";

const MovieItemComponent = ({movie}) =>
    <div className="row p-2">
        <div className="col-2">

            <Link to={`/details/${movie.id}`}>
                <img src={TMDB_IMAGE_URL(200, movie.poster_path)}
                     alt="Poster"
                     className="img-thumbnail"/>
            </Link>
        </div>
        <div className="col-10">
            <Link to={`/details/${movie.id}`} className="lead">{movie.title}</Link>
            <div>
              <Rating fractions={4}
                      start={0}
                      stop={10}
                      step={2}
                      initialRating={movie.vote_average}
                      readonly={true}
                      fullSymbol={<i className="fas fa-star"/>}
                      emptySymbol={<i className="far fa-star"/>}/></div>
            <div>Release date: {movie.release_date}</div>
            <p>{movie.overview}</p>
        </div>
    </div>;

export default MovieItemComponent
