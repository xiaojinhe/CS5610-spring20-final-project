import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";
import ReviewService from "../services/ReviewService";
import UserService from "../services/UserService";

const store = require('store');

class MovieReviewItemComponent extends React.Component {

  state = {
    review: this.props.review
  };

  likeReview = (reviewId) => {
    if (store.get('currUser') == null) {
      alert("Please login first!");
      this.props.history.push('/login');
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
    UserService.getCurrentUser().then(response => {
      if (response) {
        store.set('currUser', response);
        ReviewService.getReviewById(reviewId)
          .then(review => this.setState({
            review: review
          }))
      }
    })
  };

  shouldShowHollowLikeButton = (user) => {
    return !user || (user && user.likedReviews.filter(review => review._id === this.state.review._id).length === 0);
  };


  isReviewWrittenByCurrentUser = () => {
    const currUser = store.get("currUser");
    if (currUser) {
      return this.state.review.userId === currUser._id
    } else {
      //if no user has logged in
      return false;
    }
  };


  render() {
    return (
      <div className="p-2 mt-2 row">
        {this.state.review.moviePosterURL &&
        <div className={`${this.props.isHomePage ? 'col-3 pr-0' : 'col-2'}`}>
          <Link to={`/details/${this.state.review.tmdbId}`}>
            <img className="img-thumbnail" src={this.state.review.moviePosterURL} alt=""/>
          </Link>
        </div>
        }
        <div className={`${this.props.isHomePage ? 'col-9' : 'col-10'}`}>
          {this.props.isCurrentUser&&
           <button className="btn btn-warning float-right" onClick={this.props.deleteReview}>
             Delete
           </button>
          }
          <div className="font-weight-bold pr-2">
            {this.state.review.title}
          </div>
          {
            <small>Review for&nbsp;
              <Link to={`/details/${this.state.review.tmdbId}`}>
                {this.state.review.movieName}
              </Link>
            </small>
          }
          <div>
            <Rating fractions={4}
                    start={0}
                    stop={10}
                    step={2}
                    initialRating={this.state.review.rating ? this.state.review.rating : 0}
                    readonly={true}
                    fullSymbol={<i className="fas fa-star"/>}
                    emptySymbol={<i className="far fa-star"/>}/>

            {this.props.isHomePage?
              <small>
                Published at {this.state.review.date && this.state.review.date.substring(0, 10)}
              </small> :
              <span className="ml-2">
                Published at {this.state.review.date && this.state.review.date.substring(0, 10)}
              </span>
            }

            {!this.props.isInProfile &&
            <div> Written by <Link
              to={this.isReviewWrittenByCurrentUser() ? "/profile" : `/profile/${this.state.review.userId}`}>
              {this.state.review.username}</Link>
            </div>
            }
          </div>
          <div className="text-break">{this.state.review.content}</div>
          {!this.props.isInProfile&&
           <div>
             {this.shouldShowHollowLikeButton(store.get("currUser")) &&
              <button className="btn"
                      onClick={() => {
                        this.likeReview(this.state.review._id);
                      }}>
                <i className="far fa-thumbs-up fa-lg pr-2"/>
                {this.state.review.likes ? this.state.review.likes : 0}
              </button>
             }

             {!this.shouldShowHollowLikeButton(store.get("currUser")) &&
              <button className="btn"
                      onClick={() => {
                        this.cancelLikeReview(this.state.review._id);
                      }}>
                <i className="fas fa-thumbs-up fa-lg pr-2"/>
                {this.state.review.likes ? this.state.review.likes : 0}
              </button>
             }
           </div>
          }
          {this.props.isInProfile&&
           <div>
             <i className="fas fa-fire fa-lg pt-2 pr-2"/>
             {this.state.review.likes ? this.state.review.likes : 0}
           </div>
          }
        </div>
      </div>
    )
  }
}

export default MovieReviewItemComponent
