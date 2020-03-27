import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";
import CommentService from "../services/CommentService";

//TODO: Limit the input length and redirect to ? after success
class WriteCommentComponent extends React.Component {
  state = {
    content: "",
    rating: 0,
    movieName: ""
  };

  componentDidMount() {
    const {movieName} = this.props.location.state;
    this.setState({movieName: movieName})
  }

  createComment = () => {
    CommentService.createComment(this.props.movieId, {
      tmdbId: this.props.movieId,
      movieName: this.state.movieName,
      rating: this.state.rating,
      content: this.state.content,
      date: new Date(),
      type: "COMMENT"
    })
  };

  render() {
    let textArea;
    return (
      <div className="container-fluid">
        <div className="rounded m-5 border border-primary">
          <div className="row mt-3 ml-3 mr-3 pl-1 pr-3 pt-3">
            <div className="col-9 pl-0">
              <h3>Comment for {this.state.movieName}</h3>
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
            <label htmlFor="commentText"
                   className="col-form-label">
              <b>Comment: (max length: 380)</b>
            </label>
            <textarea className="form-control"
                      id="commentText"
                      placeholder="Lorem ipsum"
                      rows="2"
                      maxLength="380"
                      defaultValue={this.state.content}
                      ref={ta => textArea = ta}
                      onChange={() => {
                        this.setState({content: textArea.value.trim()})
                      }}>
              </textarea>
          </div>
          <div className="content-form pl-3 pr-3 pb-3 ml-3 mr-3 mb-3 pt-2">
            <button className="btn btn-success"
                    onClick={this.createComment}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default WriteCommentComponent;
