import React from 'react'
import {searchMovies} from "../services/TMDbService";

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
                {this.state.results && this.state.results.map(movie => {
                    return <div key={movie.id}>
                        {movie.title}
                    </div>
                })}
            </div>
        )
    }
}

export default SearchResultComponent