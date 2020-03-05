import React from 'react'
import TMDbService from "../services/TMDbService";
import MovieCardComponent from "./MovieDetailComponents/MovieCardComponent";
import NavComponent from "./NavComponent";
import MovieReviewListComponent from "./MovieReviewListComponent";
import movieReviewService from "../services/MovieReviewService";

const topRatedMoviesDisplayNum = 18;
const nowPlayingMoviesDisplayNum = 18;
const pickedReviewDisplayNum = 5;

class HomepageComponent extends React.Component {

    state = {
        topRatedMovies: [],
        nowPlayingMovies: [],
        pickedReviews: []
    };

    componentDidMount() {
        Promise.all([TMDbService.findTopRatedMovies(), TMDbService.findNowPlayingMovies(), movieReviewService.findCriticPickedMovieReviews()])
            .then(([topRatedMovies, nowPlayingMovies, pickedReviews]) => {
                this.setState(
                    {
                        topRatedMovies:
                            topRatedMovies.results.slice(0, topRatedMoviesDisplayNum),
                        nowPlayingMovies:
                            nowPlayingMovies.results.slice(0, nowPlayingMoviesDisplayNum),
                        pickedReviews: pickedReviews.results.slice(0, pickedReviewDisplayNum)
                    })
            })
    }

    render() {
        return (
            <div>
                <NavComponent history={this.props.history}
                              enableSearch={true}/>
                <div className="container">
                    <div className="mt-5">
                        <h1 className="border-bottom pt-2">Now Playing Movies</h1>
                        <div className="row">
                            {
                                this.state.nowPlayingMovies && this.state.nowPlayingMovies.map(
                                    function (movie) {
                                        return <MovieCardComponent movie={movie}
                                                                   key={movie.id}/>
                                    })
                            }
                        </div>
                    </div>

                    <div className="mt-5">
                        <h1 className="border-bottom pt-2">Top Rated Movies</h1>
                        <div className="row">
                            {
                                this.state.topRatedMovies && this.state.topRatedMovies.map(
                                    function (movie) {
                                        return <MovieCardComponent movie={movie}
                                                                   key={movie.id}/>
                                    })
                            }
                        </div>
                    </div>
                    <div>
                        <h1 className="border-bottom pt-2">Critic Picked Reviews</h1>
                        <MovieReviewListComponent
                            pickedReviews={this.state.pickedReviews}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default HomepageComponent