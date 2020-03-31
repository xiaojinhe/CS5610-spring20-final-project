import React from 'react'
import MovieCardComponent from "../components/MovieCardComponent";
import NavComponent from "../components/NavComponent";
import MovieReviewListComponent from "../components/MovieReviewListComponent";
import MovieService from "../services/MovieService";
import ReviewService from "../services/ReviewService";
const store = require('store');

const topRatedMoviesDisplayNum = 18;
const nowPlayingMoviesDisplayNum = 18;
const pickedReviewDisplayNum = 5;

class HomepageContainer extends React.Component {

    state = {
        topRatedMovies: [],
        nowPlayingMovies: [],
        pickedReviews: []
    };

    componentDidMount() {
        if (store.get('currUser')) {
            MovieService.findNowPlayingMovies().then(
              movies => {
                  this.setState(
                    {
                        nowPlayingMovies: movies.results.slice(0, nowPlayingMoviesDisplayNum)
                    })
              }
            );
        } else {
            Promise.all([MovieService.findTopRatedMovies(), MovieService.findNowPlayingMovies(), ReviewService.findMostLikedReview()])
              .then(([topRatedMovies, nowPlayingMovies, pickedReviews]) => {
                  this.setState(
                    {
                        topRatedMovies:
                          topRatedMovies.results.slice(0, topRatedMoviesDisplayNum),
                        nowPlayingMovies:
                          nowPlayingMovies.results.slice(0, nowPlayingMoviesDisplayNum),
                        pickedReviews: pickedReviews.slice(0, pickedReviewDisplayNum)
                    })
              });
        }
    }

    render() {
        const currUser = store.get('currUser');
        if (currUser) {
            return (
              <div className="container-fluid">
                  <NavComponent history={this.props.history}
                                enableSearch={true}/>
                  <div className="row">
                      <div className="mt-3 col-sm-12 col-md-7">
                          <h1 className="border-bottom pt-2 pb-2 text-left">Now Playing Movies</h1>
                          <div className="row">
                              {
                                  this.state.nowPlayingMovies && this.state.nowPlayingMovies.map(
                                    function (movie) {
                                        return <MovieCardComponent movie={movie}
                                                                   logined={true}
                                                                   key={movie.id}/>
                                    })
                              }
                          </div>
                      </div>
                      <div className="mt-3 col-sm-12 col-md-4">

                      </div>
                  </div>
              </div>
            );
        } else {
            return (
              <div className="container-fluid">
                  <NavComponent history={this.props.history}
                                enableSearch={true}/>
                  <div className="container">
                      <div className="mt-3">
                          <h1 className="border-bottom pt-2 pb-2 text-left">Now Playing Movies</h1>
                          <div className="row">
                              {
                                  this.state.nowPlayingMovies && this.state.nowPlayingMovies.map(
                                    function (movie) {
                                        return <MovieCardComponent movie={movie}
                                                                   key={movie.id}/>
                                    })
                              }
                          </div>
                      </div>

                      <div className="mt-2">
                          <h1 className="border-bottom pt-2 pb-2 text-left">Top Rated Movies</h1>
                          <div className="row">
                              {
                                  this.state.topRatedMovies && this.state.topRatedMovies.map(
                                    function (movie) {
                                        return <MovieCardComponent movie={movie}
                                                                   logined={false}
                                                                   key={movie.id}/>
                                    })
                              }
                          </div>
                      </div>
                      <div>
                          <h1 className="border-bottom pt-2 pb-2 text-left">Critic Picked Reviews</h1>
                          <MovieReviewListComponent
                            pickedReviews={this.state.pickedReviews}/>
                      </div>

                  </div>
              </div>
            );
        }
    }
}

export default HomepageContainer
