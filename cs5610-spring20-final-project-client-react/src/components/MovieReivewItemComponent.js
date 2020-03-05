import React from "react";

const MovieReviewItemComponent = ({review}) =>
    <div className="p-2 mt-2 row">
        <div className="col-2">
            {review.multimedia.src &&
            <img className="img-thumbnail" src={review.multimedia.src}/>}
        </div>
        <div className="col-10">
            <div>
                {/*//todo: change a to the link to */}
                <a href={review.link.url}
                   className="font-weight-bold">{review.headline}</a>
            </div>
            <small>Review for {review.display_title}</small>
            <div>Published at {review.publication_date}</div>
            <div>{review.summary_short}</div>
        </div>
    </div>

export default MovieReviewItemComponent