import {
  findAllMovieInfoById,
  findMovieById,
  findReviewsForMovie,
  findCommentsForMovie, setMovieAsFavoriteAction, setMovieNotFavoriteAction
} from "../actions/MovieDetailActions";
import MovieDetailComponent from "../components/MovieDetailComponents/MovieDetailComponent";
import {connect} from "react-redux";
import MovieService from "../services/MovieService";
import ReviewService from "../services/ReviewService";
import CommentService from "../services/CommentService";
import React from "react";
import UserService from "../services/UserService";

const store = require('store')

const stateToPropertyMapper = (state) => ({
  movie: state.movieDetail.movie,
  comments: state.movieDetail.comments,
  reviews: state.movieDetail.reviews,
  favorite: state.movieDetail.favorite,
  publicReviews: state.movieDetail.publicReviews
});

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findMovieById: async (movieId) => {
      const movie = await MovieService.findMovieById(movieId);
      dispatch(findMovieById(movie));
    },
    findReviewsForMovie: async (movieId) => {
      const reviews = await ReviewService.findAllReviewsByMovieId(movieId)
        .then(response => response.results);
      dispatch(findReviewsForMovie(reviews));
    },
    findAllMovieInfoById: async (movieId) => {
      const movie = await MovieService.findMovieById(movieId);
      const reviews = await ReviewService.findAllReviewsByMovieId(movieId);
      const comments = await CommentService.findAllCommentsByMovieId(movieId);
      const publicReviews = await ReviewService.findPublicReviewsForMovie(movie.title);
      dispatch(findAllMovieInfoById(movie, comments, reviews, publicReviews.results));
    },
    findCommentsForMovie: async (movieId) => {
      const comments = await CommentService.findAllCommentsByMovieId(movieId);
      dispatch(findCommentsForMovie(comments));
    },
    addMovieToUserFavorites: (movieId, movie) => {
      MovieService.addMovieToUserFavorites(movieId, movie)
        .then(response => {
          if (response.status === 200) {
            dispatch(setMovieAsFavoriteAction())
            //should also update the user because
            UserService.getCurrentUser()
              .then(response => {
                if (response) {
                  store.set('currUser', response);
                }
              })
          } else {
            alert("Fail to add movie to your favorite list. Please try again later");
          }
        })
    },
    removeMovieFromUserFavorites: (movieId) => {
      MovieService.removeMovieFromUserFavorites(movieId)
        .then(response => {
          if (response.status === 200) {
            dispatch(setMovieNotFavoriteAction())
            //should also update the user because
            UserService.getCurrentUser()
              .then(response => {
                if (response) {
                  store.set('currUser', response);
                }
              })
          } else {
            alert("Fail to remove movie from your favorite list. Please try again later");
          }
        })
    },
    setMovieAsFavorite: () => {
      dispatch(setMovieAsFavoriteAction())
    },
    setMovieNotFavorite: () => {
      dispatch(setMovieNotFavoriteAction())
    }
  };
};

const MovieDetailContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(MovieDetailComponent);

export default MovieDetailContainer

