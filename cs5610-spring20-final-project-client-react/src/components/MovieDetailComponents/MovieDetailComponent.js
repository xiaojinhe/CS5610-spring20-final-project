import React from "react";
import {CRITIC_USER, MOVIE_TRAILER_API_URL, REGULAR_USER, TMDB_IMAGE_URL} from "../../common/constants";
import CastCardComponent from "./CastCardComponent";
import MovieDetailSummaryComponent from "./MovieDetailSummaryComponent";
import MovieRatingFavorComponent from "./MovieRatingFavorComponent";
import {Link} from "react-router-dom";
import MovieCommentsListComponent from "../MovieCommentsListComponent";
import MovieReviewListComponent from "../MovieReviewListComponent";
import MovieCardComponent from "../MovieCardComponent";
import PublicMovieReviewListComponent from "./PublicMovieReviewListComponent";
import NavContainer from "../../containers/NavContainer";

const publicReviewDisplayNum = 5;
const store = require("store");

class MovieDetailComponent extends React.Component {
  componentDidMount() {
    this.props.findAllMovieInfoById(this.props.movieId);
    this.setMovieFavoriteInitialState();

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.movieId !== this.props.movieId) {
      this.props.findAllMovieInfoById(this.props.movieId);
      this.setMovieFavoriteInitialState();
    }
  }

  setMovieFavoriteInitialState = () => {
    if (store.get("currUser")) {
      for (const movie of store.get("currUser").favoriteMovies) {
        if (movie.id === this.props.movieId) {
          this.props.setMovieAsFavorite();
          return;
        }
      }
      this.props.setMovieNotFavorite()
    } else {
      this.props.setMovieNotFavorite()
    }
  };

  addMovieToFavorite = () => {
    this.props.addMovieToUserFavorites(this.props.movieId,
      {
        id: this.props.movieId,
        title: this.props.movie.title,
        release_date: this.props.movie.release_date,
        poster_path: this.props.movie.poster_path,
        vote_average: this.props.movie.vote_average,
        overview: this.props.movie.overview
      });
  };

  removeMovieFromFavorite = () => {
    this.props.removeMovieFromUserFavorites(this.props.movieId);
  };

  loginCheck = () => {
    if (!store.get('currUser')) {
      alert("Please login first!");
    }
  };

  renderTrailer = (video, index) =>
    <iframe width="400"
            key={index}
            height="250"
            title="trailer"
            className="pr-2"
            src={MOVIE_TRAILER_API_URL(video.key)}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen/>;

  render() {
    const currUser = store.get("currUser");
    if (this.props.movie) {
      return (
        <div className="container-fluid movie-detail-container">
          <NavContainer history={this.props.history}
                        enableSearch={true}/>
          <div className="movie-summary pt-3">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-12 ml-1 mr-2 mt-2 mr-lg-5 mr-md-4">
                <img src={TMDB_IMAGE_URL(185, this.props.movie.poster_path)}
                     className="image-fluid"
                     alt=""/>
              </div>
              <div className="col-lg-6 col-md-5 col-sm-5 col-12 p-1">
                <MovieDetailSummaryComponent movie={this.props.movie}/>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-2 col-12 p-1">
                <MovieRatingFavorComponent
                  history={this.props.history}
                  favorite={this.props.favorite}
                  addMovieToFavorite={this.addMovieToFavorite}
                  removeMovieFromFavorite={this.removeMovieFromFavorite}
                  rating={this.props.movie.vote_average}
                  voteCount={this.props.movie.vote_count}/>

                {(!currUser || currUser.role === REGULAR_USER) &&
                <Link to={currUser ? {
                  pathname: `/movies/${this.props.movieId}/new_comment`, state: {
                    movieName: this.props.movie.title,
                    moviePosterURL: this.props.movie.poster_path
                  }
                } : "/login"}
                      onClick={this.loginCheck}>
                  <h6><i className="far fa-comment-alt mt-2"/> Write Comment</h6>
                </Link>
                }

                {(!currUser || currUser.role === CRITIC_USER) &&
                <Link to={currUser ? {
                  pathname: `/movies/${this.props.movieId}/new_review`,
                  state: {
                    movieName: this.props.movie.title,
                    moviePosterURL: this.props.movie.poster_path
                  }
                } : "/login"}
                      onClick={this.loginCheck}>
                  <h6><i className="fas fa-pencil-alt mt-2"/> Write Review</h6>
                </Link>
                }
              </div>
            </div>
          </div>

          <div className="movie-overview mt-2 ml-1">
            <h3 className="movie-header">Overview</h3>
            {this.props.movie.overview && <p>{this.props.movie.overview}</p>}
          </div>
          <div className="movie-cast ml-1 mt-2">
            <h3 className="movie-header">Major Cast</h3>
            <div className="row">
              {this.props.movie.stars.map((star, index) =>
                <CastCardComponent
                  key={index}
                  object={star}/>)}
            </div>
          </div>
          {this.props.movie.videos &&
          <div className="movie-trailer ml-1 mt-3">
            {this.props.movie.videos.results.length > 1 &&
            <div>
              <h3 className="movie-header">Trailers</h3>
              <div className="justify-content-center">
                {this.props.movie.videos.results.slice(0, 2).map((video, index) => this.renderTrailer(video, index))}
              </div>
            </div>
            }
            {this.props.movie.videos.results.length === 1 &&
            <div>
              <h3 className="movie-header">Trailer</h3>
              {this.renderTrailer(this.props.movie.videos.results[0])}
            </div>
            }
          </div>
          }

          {this.props.comments &&
          <div className="movie-comment m-1 mt-3">
            <div className="row">
              <div className="col-9">
                <h3 className="movie-header">Movie Comments</h3>
              </div>
              <div className="col-3 pt-2 pr-2 text-center">
                {(!currUser || currUser.role === REGULAR_USER) &&
                <Link to={currUser ? {
                  pathname: `/movies/${this.props.movieId}/new_comment`,
                  state: {movieTitle: this.props.movie.title, moviePosterURL: this.props.movie.poster_path}
                } : "/login"}
                      onClick={this.loginCheck}>
                  <h6><i className="far fa-comment-alt"/> Write Comment</h6>
                </Link>
                }

              </div>
            </div>
            <MovieCommentsListComponent comments={this.props.comments}/>
          </div>
          }

          {this.props.reviews &&
          <div className="movie-review m-1 mt-3">
            <div className="row">
              <div className="col-9">
                <h3 className="movie-header">Movie Reviews</h3>
              </div>
              <div className="col-3 pt-2 pr-2 text-center">
                {(!currUser || currUser.role === CRITIC_USER) &&
                < Link to={currUser ? {
                  pathname: `/movies/${this.props.movieId}/new_review`,
                  state: {movieTitle: this.props.movie.title, moviePosterURL: this.props.movie.poster_path}
                } : "/login"}
                       onClick={this.loginCheck}>
                  <h6><i className="fas fa-pencil-alt"/> Write Review</h6>
                </Link>
                }
              </div>
            </div>
            <MovieReviewListComponent
              pickedReviews={this.props.reviews}
              history={this.props.history}/>
          </div>}

          {this.props.publicReviews &&
          <div className="m-1 mt-3">
            <h3 className="movie-header">Public Movie Reviews</h3>
            <PublicMovieReviewListComponent
              publicReviews={this.props.publicReviews.slice(0, publicReviewDisplayNum)}
              history={this.props.history}/>
          </div>}

          {this.props.movie.similar.results &&
          <div className="similar-movie m-1 mt-3">
            <h3 className="movie-header">Similar Movies</h3>
            <div className="row">
              {this.props.movie.similar.results.slice(0, 6).map(
                function (movie) {
                  return <MovieCardComponent movie={movie}
                                             key={movie.id}/>
                })
              }
            </div>
          </div>}
        </div>
      )
    }
    return (
      <div className="m-4">
        <h2>Loading...</h2>
      </div>
    )
  }
}

export default MovieDetailComponent
