import React from "react";
import {MOVIE_TRAILER_API_URL, TMDB_IMAGE_URL} from "../common/constants";
import CastCardComponent from "./CastCardComponent";
import MovieDetailSummaryComponent from "./MovieDetailSummaryComponent";
import MovieRatingFavorComponent from "./MovieRatingFavorComponent";

class MovieDetailComponent extends React.Component {
  componentDidMount() {
    this.props.findAllMovieInfoById(this.props.movieId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.movieId !== this.props.movieId) {
      this.props.findAllMovieInfoById(this.props.movieId);
    }
  }

  renderTrailer = (video) =>
      <iframe width="400"
              height="250"
              title="trailer"
              className="pr-1"
              src={MOVIE_TRAILER_API_URL(video.key)}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen />;

  render() {
    if (this.props.movie) {
      return(
        <div className="container-fluid movie-detail-container p-3">
          <div className="movie-summary">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-12 ml-2 mt-2 mr-lg-5 mr-md-4">
                <img src={TMDB_IMAGE_URL(185, this.props.movie.poster_path)}
                     className="image-fluid"
                     alt=""/>
              </div>
              <div className="col-lg-6 col-md-5 col-sm-5 col-12 p-1">
                <MovieDetailSummaryComponent movie={this.props.movie}/>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-2 col-12">
                <MovieRatingFavorComponent
                  rating={this.props.movie.vote_average}
                  voteCount={this.props.movie.vote_count}/>
              </div>
            </div>
          </div>
          <div className="movie-overview">
            <h3 className="movie-header">Overview</h3>
            {this.props.movie.overview && <p>{this.props.movie.overview}</p>}
          </div>
          <div className="movie-cast">
            <h3 className="movie-header">Major Cast</h3>
            <div className="row">
              {this.props.movie.stars.map((star, index) =>
                                            <CastCardComponent
                                              key={index}
                                              object={star}/>)}
            </div>
          </div>
          {this.props.movie.videos &&
           <div className="movie-trailer">
             {this.props.movie.videos.results.length > 1 &&
              this.props.movie.videos.results.slice(0, 2).map(video =>
                <div>
                  <h3 className="movie-header">Trailers</h3>
                  {this.renderTrailer(video)}
                </div>
             )}
             {this.props.movie.videos.results.length === 1 &&
              <div>
                <h3 className="movie-header">Trailer</h3>
                {this.renderTrailer(this.props.movie.videos.results[0])}
              </div>
             }

           </div>
          }
          <div className="movie-review">
            <h3 className="movie-header">Critic Reviews</h3>
            <h5 className="movie-header">New York Times Reviews</h5>
            {this.props.reviews.results.map(res => <div>
              <p>{res.summary_short} (<a href={res.link.url}>Link to Source</a>)</p>
            </div>)}
          </div>

        </div>
      )
    }
    return (
      <div className="m-4">
        <h2>Page is loading...</h2>
      </div>
    )
  }
}

export default MovieDetailComponent