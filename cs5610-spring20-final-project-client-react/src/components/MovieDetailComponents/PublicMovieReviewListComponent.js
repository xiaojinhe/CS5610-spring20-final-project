import React from "react";
import PublicReviewItemComponent from "./PublicReviewItemomponent";

class PublicMovieReviewListComponent extends React.Component {
  render() {
    return (
      this.props.publicReviews && this.props.publicReviews.map((review, index) =>
        <PublicReviewItemComponent review={review}
                                  key={index}/>)
    )
  }
}

export default PublicMovieReviewListComponent
