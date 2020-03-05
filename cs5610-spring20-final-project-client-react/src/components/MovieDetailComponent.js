import React from "react";
import {MOVIE_POSTER_PATH_API_URL} from "../common/constants";

class MovieDetailComponent extends React.Component {
  componentDidMount() {
    this.props.findAllMovieInfoById(this.props.movieId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.movieId !== this.props.movieId) {
      this.props.findAllMovieInfoById(this.props.movieId);
    }
  }

  render() {
    return(
      <div className="container-fluid movie-detail-container">
        <div className="movie-title">
          <h1 className="font-weight-bold">{this.props.movie.title}</h1>
        </div>
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-12 col-12">
            {console.log(this.props.movie)}
            <img src={MOVIE_POSTER_PATH_API_URL("w185", this.props.movie.poster_path)}
                 className="image-fluid"
                 alt=""/>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div>
              <h6>Director: {this.props.movie.directors}</h6>
              <h6>Writers: {this.props.movie.writers}</h6>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default MovieDetailComponent