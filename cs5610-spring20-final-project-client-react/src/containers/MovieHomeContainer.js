import React from "react";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MovieDetailContainer from "./MovieDetailContainer";
import movieDetailReducer from "../reducers/MovieDetailReducer";

const reducers = combineReducers({movieDetail: movieDetailReducer});

const store = createStore(reducers);

class MovieHomeContainer extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div className="container-fluid">
          <Router>
            <Route
              path="/details/:movieId"
              exact={true}
              render = {(props) =>
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
