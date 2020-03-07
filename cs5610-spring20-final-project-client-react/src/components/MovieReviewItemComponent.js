import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";

class MovieReviewItemComponent extends React.Component {
  state = {
    likes: 0,
    dislikes: 0
  };

  render() {
    console.log(this.props.review)
    return (
      <div className="p-2 mt-2 row">
        {this.props.review.multimedia && this.props.review.multimedia.src &&
        <div className="col-2">
          {
            this.props.isInProfile ?
              <Link to={`/details/${this.props.review.mid}`}>
                <img className="img-thumbnail" src={this.props.review.multimedia.src} alt=""/>
              </Link>
              :
              <img className="img-thumbnail" src={this.props.review.multimedia.src} alt=""/>
          }
        </div>
        }
        <div className="col-10">
          <div>
            {/*//todo: change a to the link to */}
            <a href={this.props.review.link.url}
               className="font-weight-bold pr-2">{this.props.review.headline}</a>
          </div>
          {
            this.props.isInProfile ?
              <small>Review for&nbsp;
                <Link to={`/details/${this.props.review.mid}`}>
                  {this.props.review.display_title}
                </Link>
              </small>
              :
              <small>Review for {this.props.review.display_title}</small>
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
            <span className="ml-2">Published at {this.props.review.publication_date}</span>
          </div>
          <div>{this.props.review.summary_short}</div>
          <div>
            {/*//todo: change to actual rating */}
            <button className="btn"
                    onClick={() => {
                      this.setState((prevState) => {
                        return {likes: prevState.likes + 1}
                      })
                    }}>
              <i className="far fa-thumbs-up fa-lg pr-2"/>
              {this.state.likes}
            </button>
            <button className="btn ml-4"
                    onClick={() => {
                      this.setState((prevState) => {
                        return {dislikes: prevState.dislikes + 1}
                      })
                    }}>
              <i className="far fa-thumbs-down fa-lg pr-2"/>
              {this.state.dislikes}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieReviewItemComponent