import React from 'react'
import TMDbService from "../services/TMDbService";
import MovieCardComponent from "./MovieCardComponent";

const topRatedMoviesDisplayNum = 18
const nowPlayingMoviesDisplayNum = 18

class HomepageComponent extends React.Component {

    state = {
        topRatedMovies: [],
        nowPlayingMovies: []

    };

    componentDidMount() {
        Promise.all([TMDbService.findTopRatedMovies(), TMDbService.findNowPlayingMovies()])
            .then(([topRatedMovies, nowPlayingMovies]) => {
                this.setState(
                    {
                        topRatedMovies:
                            topRatedMovies.results.slice(0, topRatedMoviesDisplayNum),
                        nowPlayingMovies:
                            nowPlayingMovies.results.slice(0, nowPlayingMoviesDisplayNum)
                    })
            })
    }

    render() {
        return (
            <div>
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
        );
    }
}

export default HomepageComponent