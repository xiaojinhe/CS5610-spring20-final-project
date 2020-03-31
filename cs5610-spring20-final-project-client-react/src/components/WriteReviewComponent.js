import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";
import ReviewService from "../services/ReviewService";

const WAIT_INTERVAL = 2000;

class WriteReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      content: "",
      title: "",
      rating: 0,
      movieName: ""
    };
    this.timer = null;
  }

  componentDidMount() {
    this.setState({movieName: this.props.location.state.movieName})
  }

  handleOnChange = (event) => {
    clearTimeout(this.timer);
    this.setState({url: event.target.value});
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      clearTimeout(this.timer);
      this.triggerChange();
    }
  };

  handleOnBlur = () => {
    clearTimeout(this.timer);
    this.triggerChange();
  };

  triggerChange = () => {
    //TODO: SAVE THE CHANGE TO LOCAL STORE
  };

  createReview = () => {
    ReviewService.createReview(this.props.movieId,
      {
        tmdbId: this.props.movieId,
        movieName: this.state.movieName,
        moviePosterURL: this.state.url === "" ? this.props.location.state.moviePosterURL : this.state.url,
        rating: this.state.rating,
        title: this.state.title,
        content: this.state.content,
        date: new Date(),
        type: "REVIEW"
      }).then(response => this.props.history.push(`/details/${this.props.movieId}`))
  };

  render() {
    let title, textArea;
    return (
      <div className="container-fluid">
        <div className="rounded m-5 border border-primary">
          <div className="row mt-3 ml-3 mr-3 pl-1 pr-3 pt-3">
            <div className="col-9 pl-0">
              <h3>Review for {this.state.movieName}</h3>
            </div>
            <div className="col-3 text-right pt-2">
              <Link to={`/details/${this.props.movieId}`}><i className="fas fa-times fa-lg"/></Link>
            </div>
          </div>
          <div className="ml-3 mr-3 pl-3 pr-3 pt-2">
            <b className="mr-4">Rate this:</b>
            <Rating fractions={4}
                    start={0}
                    stop={10}
                    step={2}
                    onChange={(value) => {
                      this.setState({rating: value})
                    }}
                    fullSymbol={<i className="fas fa-star fa-lg"/>}
                    emptySymbol={<i className="far fa-star fa-lg"/>}/>
          </div>
          <div className="content-form pl-3 pr-3 ml-3 mr-3 pt-2">
            <label htmlFor="title"
                   className="col-form-label">
              <b>Review Title</b>
            </label>
            <input type="text"
                   className="form-control"
                   id="title"
                   placeholder="Review title"
                   defaultValue={this.state.title}
                   ref={node => title = node}
                   onChange={() => {
                     this.setState({title: title.value.trim()})
                   }}>
            </input>
            <label htmlFor="reviewText"
                   className="col-form-label">
              <b>Review:</b>
            </label>
            <textarea className="form-control"
                      id="reviewText"
                      placeholder="Lorem ipsum"
                      rows="5"
                      maxLength="2000"
                      defaultValue={this.state.content}
                      ref={ta => textArea = ta}
                      onChange={() => {
                        this.setState({content: textArea.value.trim()})
                      }}>
              </textarea>
          </div>
          <div className="content-form pl-3 pr-3 ml-3 mr-3 pt-2">
            <label htmlFor="imageURL"
                   className="col-form-label pb-0">
              Image URL
            </label>
            <input className="form-control"
                   id="imageURL"
                   type="url"
                   placeholder="Image URL"
                   value={this.state.url}
                   onBlur={this.handleOnBlur}
                   onChange={this.handleOnChange}
                   onKeyDown={this.handleKeyDown}>
            </input>
          </div>
          <div className="content-form pl-3 pr-3 ml-3 mr-3 pt-2">
            {this.state.url && <h4>Image Preview</h4>}
            {
              this.state.url ?
                <img src={this.state.url}
                     className="image-fluid"
                     alt=""/> :
                ""
            }
          </div>
          {/*TODO: SAVE THE REVIEW*/}
          <div className="content-form pl-3 pr-3 pb-3 ml-3 mr-3 mb-3 pt-2">
            <button className="btn btn-success"
                    onClick={this.createReview}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default WriteReviewComponent;
