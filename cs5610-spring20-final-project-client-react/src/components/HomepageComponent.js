import React from 'react'
import TMDbService from "../services/TMDbService";
import MovieCardComponent from "./MovieCardComponent";

class HomepageComponent extends React.Component {

    state = {
        topRatedMovies: [],
        nowPlayingMovies: []

    };

    componentDidMount() {
        Promise.all([TMDbService.findTopRatedMovies(), TMDbService.findNowPlayingMovies()])
            .then(([topRatedMovies, nowPlayingMovies]) => {
                this.setState({
                    topRatedMovies: topRatedMovies.results,
                    nowPlayingMovies: nowPlayingMovies.results
                })
            })
    }

    render() {
        return (
            <div>
                <div className="row">
                    {
                        this.state.topRatedMovies && this.state.topRatedMovies.map(function (movie) {
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