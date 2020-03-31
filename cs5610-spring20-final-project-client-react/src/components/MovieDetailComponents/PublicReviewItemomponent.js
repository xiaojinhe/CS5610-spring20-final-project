import React from "react";
import Rating from "react-rating";

const PublicReviewItemComponent = ({review}) =>
  <div className="p-2 mt-2 row">
    {review.multimedia && review.multimedia.src &&
    <div className="col-2">
      <img className="img-thumbnail" src={review.multimedia.src}/>
    </div>
    }
    <div className="col-10">
      <div>
        {/*//todo: change a to the link to */}
        <a href={review.link.url}
           className="font-weight-bold pr-2">{review.headline}</a>
        {/*//todo: change to actual rating */}
        <Rating fractions={4}
                start={0}
                stop={10}
                step={2}
                initialRating={review.rating ? review.rating : 7}
                readonly={true}
                fullSymbol={<i className="fas fa-star"/>}
                emptySymbol={<i className="far fa-star"/>}/>
        <span className="ml-2">Published at {review.publication_date}</span>
      </div>
      <div>{review.summary_short}</div>
    </div>
  </div>;

export default PublicReviewItemComponent
