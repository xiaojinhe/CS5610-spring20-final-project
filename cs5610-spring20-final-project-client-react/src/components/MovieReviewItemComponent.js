import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";
import ReviewService from "../services/ReviewService";
import UserSerivce from "../services/UserSerivce";

const store = require('store');

class MovieReviewItemComponent extends React.Component {

  state = {
    review: this.props.review
  };

  likeReview = (reviewId) => {
    if (store.get('currUser') == null) {
      this.props.history.push('/login')
      return
    }
    ReviewService.likeReview(reviewId)
      .then(
        response => {
          if (response.status === 200) {
            this.updateData(reviewId)
          } else {
            alert(response.status + " : " + response.statusText)
          }
        })
  };

  cancelLikeReview = (reviewId) => {

    ReviewService.cancelLikeReview(reviewId)
      .then(response => {
        if (response.status === 200) {
          this.updateData(reviewId)
        } else {
          alert(response.status + " : " + response.statusText)
        }
      })
  };

  //to get the updated current user and review
  updateData = (reviewId) => {
    UserSerivce.getCurrentUser().then(response => {
      if (response) {
        store.set('currUser', response);
        ReviewService.getReviewById(reviewId)
          .then(review => this.setState({
            review: review
          }))
      }
    })
  };

  isReviewWrittenByCurrentUser = () => {
    const currUser = store.get("currUser");
    if (currUser) {
      return this.state.review.userId === currUser._id
    } else {
      //if no user has logged in
      return false;
    }
  }


  render() {
    return (
      <div className="p-2 mt-2 row">
        {this.state.review.moviePosterURL &&
        <div className="col-2">
          {
            this.props.isInProfile ?
              <Link to={`/details/${this.state.review.tmdbId}`}>
                <img className="img-thumbnail" src={this.state.review.moviePosterURL} alt=""/>
              </Link>
              :
              <img className="img-thumbnail" src={this.state.review.moviePosterURL} alt=""/>
          }
        </div>
        }
        <div className="col-10">
          <div>
            {/*//todo: change a to the link to */}
            <span className="font-weight-bold pr-2">{this.state.review.title}</span>
          </div>
          {
            this.props.isInProfile ?
              <small>Review for&nbsp;
                <Link to={`/details/${this.state.review.tmdbId}`}>
                  {this.state.review.movieName}
                </Link>
              </small>
              :
              <small>Review for {this.state.review.movieName}</small>
          }
          <div>
            {/*//todo: change to actual rating */}
            <Rating fractions={4}
                    start={0}
                    stop={10}
                    step={2}
                    initialRating={this.state.review.rating ? this.state.review.rating : 7}
                    readonly={true}
                    fullSymbol={<i className="fas fa-star"/>}
                    emptySymbol={<i className="far fa-star"/>}/>
            <span
              className="ml-2">Published at {this.state.review.date && this.state.review.date.substring(0, 10)} </span>
            {!this.props.isInProfile &&
            <div> Written by <Link
              to={this.isReviewWrittenByCurrentUser() ? "/profile" : `/profile/${this.state.review.userId}`}>
              {this.state.review.username}</Link>
            </div>
            }
          </div>
          <div>{this.state.review.content}</div>
          <div>
            {/*//todo: change to actual rating */}
            {(!store.get("currUser") || (store.get("currUser") && !store.get("currUser").likedReviews.includes(this.state.review._id))) &&
            <button className="btn"
                    onClick={() => {
                      this.likeReview(this.state.review._id);
                    }}>
              <i className="far fa-thumbs-up fa-lg pr-2"/>
              {this.state.review.likes ? this.state.review.likes : 0}
            </button>
            }

            {store.get("currUser") && store.get("currUser").likedReviews.includes(this.state.review._id) &&
            <button className="btn"
                    onClick={() => {
                      this.cancelLikeReview(this.state.review._id);
                    }}>
              <i className="fas fa-thumbs-up fa-lg pr-2"/>
              {this.state.review.likes ? this.state.review.likes : 0}
            </button>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default MovieReviewItemComponent
