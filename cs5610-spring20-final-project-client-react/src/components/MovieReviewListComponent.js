import React from "react";
import MovieReviewItemComponent from "./MovieReviewItemComponent";

class MovieReviewListComponent extends React.Component {
  render() {
    return (
      this.props.pickedReviews && this.props.pickedReviews.map((review, index) =>
        <MovieReviewItemComponent review={review}
                                  key={index}
                                  history={this.props.history}/>)
    )
  }
}

export default MovieReviewListComponent
