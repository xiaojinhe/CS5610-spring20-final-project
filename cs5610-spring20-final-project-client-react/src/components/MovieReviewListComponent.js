import React from "react";
import MovieReviewService from "../services/MovieReviewService";
import MovieReviewItemComponent from "./MovieReivewItemComponent";

class MovieReviewListComponent extends React.Component {

    state = {
        pickedReviews: []
    };

    componentDidMount() {
        MovieReviewService.findCriticPickedMovieReviews()
            .then(response => {
                console.log(response);
                this.setState({
                    pickedReviews: response.results.slice(0, this.props.displayNum)
                })
            })
    }

    render() {
        return (
            this.state.pickedReviews.map((review, index) =>
                <MovieReviewItemComponent review={review}
                                          key={index}/>)
        )
    }
}

export default MovieReviewListComponent