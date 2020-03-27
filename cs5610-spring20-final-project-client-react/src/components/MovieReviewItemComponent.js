import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";

class MovieReviewItemComponent extends React.Component {
  state = {
    likes: 0,
    dislikes: 0
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
            <span className="ml-2">Published at {this.props.review.date}</span>
          </div>
          {/*//TODO: truncate the content*/}
          <div>{this.props.review.content}</div>
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
