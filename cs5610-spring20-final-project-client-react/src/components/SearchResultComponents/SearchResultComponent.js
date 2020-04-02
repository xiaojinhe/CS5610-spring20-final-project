import React from 'react'
import MovieItemComponent from "./MovieItemComponent";
import {connect} from "react-redux";
import MovieService from "../../services/MovieService";
import {setSearchResultAction} from "../../actions/SearchActions";
import NavContainer from "../../containers/NavContainer";

class SearchResultComponent extends React.Component {

    componentDidMount() {
        //to show result search, even if user refreshes
        if (!this.props.results || this.props.results.length === 0) {
            MovieService.searchMovies(this.props.criteria)
                .then(response => {
                        if (response.results && response.results.length > 0) {
                            this.props.setSearchResult(response.results);
                        } else {
                            alert("No result found!")
                        }
                    }
                )
        }
    }

    render() {
        return (
            <div>
                <NavContainer history={this.props.history}
                              enableSearch={true}/>
                <div className="container">
                    {this.props.results && this.props.results.map(movie =>
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
