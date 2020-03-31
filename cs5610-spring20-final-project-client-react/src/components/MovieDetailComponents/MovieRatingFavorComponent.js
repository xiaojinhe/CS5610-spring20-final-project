import Rating from "react-rating";
import React from "react";
const store = require('store');

class MovieRatingFavorComponent extends React.Component {

  favoriteOnClick = () => {
    const currUser = store.get('currUser');
    if (currUser) {
      this.props.toggleFavorite();
    } else {
      alert("Please login first");
      this.props.history.push("/login");
    }
  };

  render() {
    return(
      <div>
        <h6 className="movie-header">Rating Score</h6>
        <div className="row">
          <div className="col-3">
            <h3>{this.props.rating}</h3>
          </div>
          <div className="col-9 pt-1">
            <Rating fractions={4}
                    start={0}
                    stop={10}
                    step={2}
                    initialRating={this.props.rating}
                    readonly={true}
                    fullSymbol={<i className="fas fa-star"/>}
                    emptySymbol={<i className="far fa-star"/>}/>
          </div>
        </div>
        <h6 className="movie-header">Total votes: {this.props.voteCount}</h6>

        <label htmlFor="favor" className="favor-label pr-2">
          <h6 className="movie-header">Favor this:</h6>
        </label>
        <button className="btn border-0" id="favor" onClick={this.favoriteOnClick}>
          {this.props.favorite ? <i className="fas fa-heart fa-2x"/> : <i className="far fa-heart fa-2x"/>}
        </button>
      </div>
    );
  }
}

export default MovieRatingFavorComponent;
