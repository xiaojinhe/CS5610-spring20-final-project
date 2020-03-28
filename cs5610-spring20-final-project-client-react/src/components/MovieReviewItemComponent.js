import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";
import ReviewService, {cancelLikeReview} from "../services/ReviewService";

//TODO: show whether current user has liked this review and toggle between like and cancel like
class MovieReviewItemComponent extends React.Component {

  state = {
    likes: this.props.review.likes ? this.props.review.likes : 0
  };

  likeReview = (reviewId) => {
    ReviewService.likeReview(reviewId)
      .then(
        response => {
          if (response.status === 200) {
            this.setState((prevState) => {
              return {likes: prevState.likes + 1}
            })
          } else {
            alert(response.status + " : " + response.statusText)
          }
        })
  };

  cancelLikeReview = (reviewId) => {
    ReviewService.cancelLikeReview(reviewId)
      .then(response => {
        if (response.status === 200) {
          this.setState((prevState) => {
            return {likes: prevState.likes - 1}
          })
        } else {
          alert(response.status + " : " + response.statusText)
        }
      })
  };


  render() {
    return (
      <div className="p-2 mt-2 row">
        {this.props.review.moviePosterURL &&
        <div className="col-2">
          {
            this.props.isInProfile ?
              <Link to={`/details/${this.props.review.tmdbId}`}>
                <img className="img-thumbnail" src={this.props.review.moviePosterURL} alt=""/>
              </Link>
              :
              <img className="img-thumbnail" src={this.props.review.moviePosterURL} alt=""/>
          }
        </div>
        }
        <div className="col-10">
          <div>
            {/*//todo: change a to the link to */}
            <a href={this.props.review.title}
               className="font-weight-bold pr-2">{this.props.review.title}</a>
          </div>
          {
            this.props.isInProfile ?
              <small>Review for&nbsp;
                <Link to={`/details/${this.props.review.tmdbId}`}>
                  {this.props.review.movieName}
                </Link>
              </small>
              :
              <small>Review for {this.props.review.movieName}</small>
          }
          <div>
            {/*//todo: change to actual rating */}
            <Rating fractions={4}
                    start={0}
                    stop={10}
                    step={2}
                    initialRating={this.props.review.rating ? this.props.review.rating : 7}
                    readonly={true}
                    fullSymbol={<i className="fas fa-star"/>}
                    emptySymbol={<i className="far fa-star"/>}/>
            <span className="ml-2">Published at {this.props.review.date && this.props.review.date.substring(0,10)}</span>
          </div>
          {/*//TODO: truncate the content*/}
          <div>{this.props.review.content}</div>
          <div>
            {/*//todo: change to actual rating */}
            <button className="btn"
                    onClick={() => {
                      this.likeReview(this.props.review._id);
                    }}>
              <i className="far fa-thumbs-up fa-lg pr-2"/>
              {this.state.likes}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieReviewItemComponent
