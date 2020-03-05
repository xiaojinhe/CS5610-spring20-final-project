import React from "react";

import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MovieDetailContainer from "./MovieDetailContainer";
import movieDetailReducer from "../reducers/MovieDetailReducer";
import HomepageComponent from "../components/HomepageComponent";
import SearchResultComponent from "../components/SearchResultComponents/SearchResultComponent";

const reducers = combineReducers({movieDetail: movieDetailReducer});

const store = createStore(reducers);

class MovieHomeContainer extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="container-fluid">
                    <Router>
                        <Router>
                            <Route path="/"
                                   exact={true}
                                   render={(props) => <HomepageComponent
                                       {...props}/>
                                   }/>
                            <Route path="/search/:criteria"
                                   exact={true}
                                   render={(props) => <SearchResultComponent
                                       {...props}
                                       criteria={props.match.params.criteria}
                                   />
                                   }/>
                        </Router>
                        <Route
                            path="/details/:movieId"
                            exact={true}
                            render={(props) =>
                                <MovieDetailContainer
                                    {...props}
                                    movieId={props.match.params.movieId}/>
                            }/>
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default MovieHomeContainer;
