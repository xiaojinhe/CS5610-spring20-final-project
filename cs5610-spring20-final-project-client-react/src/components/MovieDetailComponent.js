import React from "react";
import {MOVIE_IMAGE_API_URL, MOVIE_TRAILER_API_URL} from "../common/constants";
import {RatingStar} from "./RatingStar";
import ReactStars from 'react-stars';
import CastCardComponent from "./CastCardComponent";
import MovieDetailSummaryComponent from "./MovieDetailSummaryComponent";

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
    if (this.props.movie) {
      return(
        <div className="container-fluid movie-detail-container p-3">
          <div className="movie-summary">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-12 ml-2 mt-2 mr-lg-5 mr-md-4">
                <img src={MOVIE_IMAGE_API_URL("w185", this.props.movie.poster_path)}
                     className="image-fluid"
                     alt=""/>
              </div>
              <div className="col-lg-6 col-md-5 col-sm-5 col-12 p-1">
                <MovieDetailSummaryComponent movie={this.props.movie}/>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-2 col-12">
                <h6>Rating</h6>
                <div className="row">
                  <div className="col-3">
                    <h3>{this.props.movie.vote_average}</h3>
                  </div>
                  <div className="col-9 pt-1">
                    <RatingStar rating={this.props.movie.vote_average}/>
                  </div>
                </div>
                <h6>Total votes: {this.props.movie.vote_count}</h6>
                <br/>
                <h6>Rate this:</h6>
                <ReactStars
                  count={5}
                  size={24}
                  color2={'#ffd700'} />

                <button className="btn">
                  <i className="fas fa-heart fa-2x"/>
                </button>
              </div>
            </div>
          </div>
          <div className="movie-overview">
            <h3>Overview</h3>
            {this.props.movie.overview && <p>{this.props.movie.overview}</p>}
          </div>
          <div className="movie-cast">
            <h3>Major Cast</h3>
            <div className="row">
              {this.props.movie.stars.map((star, index) =>
                                            <CastCardComponent
                                              key={index}
                                              object={star}/>)}
            </div>
          </div>
          {this.props.movie.videos &&
           <div className="movie-trailer">
             <h3>Trailer</h3>
             <div>
               <iframe width="500"
                       height="300"
                       title="trailer"
                       src={MOVIE_TRAILER_API_URL(this.props.movie.videos.results[0].key)}
                       frameBorder="0"
                       allow="autoplay; encrypted-media"
                       allowFullScreen />
             </div>
           </div>
          }
          <div className="movie-review">
            <h3>Critic Reviews</h3>
            <h5>New York Times Reviews</h5>
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