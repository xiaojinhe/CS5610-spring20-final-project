import React from "react";
import {MOVIE_POSTER_BASE_PATH, MOVIE_POSTER_PATH} from "../common/constants";

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
          <h2 className="font-weight-bold">{this.props.movie.title}</h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12 col-12">
            {console.log(this.props.movie)}
            <img src={MOVIE_POSTER_PATH("w185", this.props.movie.poster_path)}
                 className="image-fuild"
                 alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieDetailComponent