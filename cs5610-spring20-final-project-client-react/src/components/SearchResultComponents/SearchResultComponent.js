import React from 'react'
import {searchMovies} from "../../services/TMDbService";
import MovieItemComponent from "./MovieItemComponent";
import NavComponent from "../NavComponent";

class SearchResultComponent extends React.Component {
    state = {
        results: []
    };

    componentDidMount() {
        searchMovies(this.props.criteria)
            .then(response =>
                this.setState({
                    results: response.results
                })
            )
    }

    render() {
        return (
            <div>
              <NavComponent history={this.props.history}
                            enableSearch={true}/>
                <div className="container">
                    {this.state.results && this.state.results.map(movie =>
                        <MovieItemComponent
                            movie={movie}
                            key={movie.id}/>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchResultComponent