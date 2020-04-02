import React from 'react'
import MovieCardComponent from "../components/MovieCardComponent";
import MovieReviewListComponent from "../components/MovieReviewListComponent";
import MovieService from "../services/MovieService";
import ReviewService from "../services/ReviewService";
import UserService from "../services/UserService";
import MovieItemComponent from "../components/SearchResultComponents/MovieItemComponent";
import MovieReviewItemComponent from "../components/MovieReviewItemComponent";
import MovieCommentItemComponent from "../components/MovieCommentItemComponent";
import {CRITIC_USER} from "../common/constants";
import NavContainer from "./NavContainer";

const store = require('store');

const topRatedMoviesDisplayNum = 18;
const nowPlayingMoviesDisplayNum = 18;
const pickedReviewDisplayNum = 5;
const favoriteMoviesDisplayNum = 5;

class HomepageContainer extends React.Component {

  state = {
    topRatedMovies: [],
    nowPlayingMovies: [],
    pickedReviews: [],
    followedCriticReviews: []
  };

  componentDidMount() {
    const currUser = store.get('currUser');
    if (currUser) {
      Promise.all([MovieService.findNowPlayingMovies(), UserService.findFollowedCriticsReviews(currUser._id),
      ])
        .then(([nowPlayingMovies, followedCriticReviews]) => {
          console.log(followedCriticReviews);
          this.setState(
            {
              nowPlayingMovies:
                nowPlayingMovies.results.slice(0, nowPlayingMoviesDisplayNum),
              followedCriticReviews: followedCriticReviews
            })
        });
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
          <NavContainer history={this.props.history}
                        enableSearch={true}/>
          <div className="row">
            <div className="mt-3 col-sm-12 col-md-6">
              <h1 className="border-bottom pt-1 pb-2 text-left">Now Playing Movies</h1>
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
            <div className="mt-3 col-sm-12 col-md-6">
              <h4 className="pt-3 pb-2 text-center">Recent Reviews from Followed Critics</h4>
              {
                this.state.followedCriticReviews && this.state.followedCriticReviews.map(
                  review =>
                    <MovieReviewItemComponent
                      isHomePage={true}
                      review={review}
                      key={review._id}/>
                )}
              <h4 className="pt-2 pb-2 text-center">
                {`My ${currUser.role === CRITIC_USER ? 'Reviews' : 'Comments'}`}
              </h4>
              {currUser.ratingAndCommentsOrReviews && currUser.ratingAndCommentsOrReviews.length > 0 ?
                currUser.ratingAndCommentsOrReviews.map(post => {
                    if (currUser.role === CRITIC_USER) {
                      return <MovieReviewItemComponent
                        isHomePage={true}
                        review={post}
                        key={post._id}/>
                    } else {
                      return <MovieCommentItemComponent
                        isHomePage={true}
                        comment={post}
                        key={post._id}/>
                    }
                  }
                ) :
                <div>No posts yet</div>
              }
              <div>
                <h4 className="pt-3 pb-2 text-center border-bottom">My favorite movies</h4>
                {
                  currUser.favoriteMovies && currUser.favoriteMovies.length > 0 ?
                    currUser.favoriteMovies.slice(0, favoriteMoviesDisplayNum).map(
                      movie =>
                        <MovieItemComponent
                          movie={movie}
                          key={movie.id}/>)
                    :
                    <div>You have not put any movie in your favorite list. </div>
                }
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <NavContainer history={this.props.history}
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
              <h1 className="border-bottom pt-2 pb-2 text-left">Most Liked Reviews</h1>
              <MovieReviewListComponent
                pickedReviews={this.state.pickedReviews}
                history={this.props.history}/>
            </div>

          </div>
        </div>
      );
    }
  }
}

export default HomepageContainer
