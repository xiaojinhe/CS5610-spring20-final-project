import React from 'react'
import {TMDB_IMAGE_URL} from "../common/constants";
import {Link} from "react-router-dom";

const MovieCardComponent = ({movie}) =>
    <div className="col-4 col-sm-3 col-md-2">
        <div className="card">
            <img className="card-img-top" src={TMDB_IMAGE_URL(500, movie.poster_path)}
                 alt="Preview"/>
        </div>
        <div className="card-body p-1">
            <div className="card-title">
                <Link to={`/details/${movie.id}`}>
                    {movie.title}
                </Link>
                <span className="ml-2">{movie.vote_average}</span>
            </div>

        </div>
    </div>;

export default MovieCardComponent
