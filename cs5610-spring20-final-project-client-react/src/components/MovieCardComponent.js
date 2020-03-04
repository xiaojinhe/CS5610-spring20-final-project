import React from 'react'
import {TMDb_IMAGE_BASE_URL} from "../common/constants";
import {Link} from "react-router-dom";

const MovieCardComponent = ({movie}) =>
        <div className="col-4 col-sm-3 col-md-2">
            <div className="card">
                <img className="card-img-top" src={TMDb_IMAGE_BASE_URL(movie.poster_path)}
                     alt="Preview"/>
            </div>
            <div className="card-body">
                <h6 className="card-title text-truncate">
                    <Link to={`/movie/${movie.id}`}>
                        {movie.title}
                    </Link>
                </h6>
                <span>{movie.vote_average}</span>
            </div>
        </div>

export default MovieCardComponent
