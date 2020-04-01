import React from 'react'
import {TMDB_IMAGE_URL} from "../common/constants";
import {Link} from "react-router-dom";
import Rating from "react-rating";

const MovieCardComponent = ({movie, logined}) =>
    <div className={logined ? "col-6 col-sm-4 col-md-4" : "col-4 col-sm-3 col-md-2"}>
        <div className="card">
          <Link to={`/details/${movie.id}`}>
            <img className="card-img-top" src={TMDB_IMAGE_URL(500, movie.poster_path)}
                 alt="Preview"/>
          </Link>
        </div>
        <div className="card-body p-1">
            <div className="card-title text-truncate">
                <Link to={`/details/${movie.id}`}>
                    {movie.title}
                </Link>
              <div>
                <Rating fractions={4}
                        start={0}
                        stop={10}
                        step={2}
                        initialRating={movie.vote_average}
                        readonly={true}
                        fullSymbol={<i className="fas fa-star"/>}
                        emptySymbol={<i className="far fa-star"/>}/>
                <span className="float-right">{movie.vote_average}</span>
              </div>

            </div>
        </div>
    </div>;

export default MovieCardComponent
