import React from "react";

import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MovieDetailContainer from "./MovieDetailContainer";
import movieDetailReducer from "../reducers/MovieDetailReducer";
import HomepageContainer from "./HomepageContainer";
import SearchResultComponent from "../components/SearchResultComponents/SearchResultComponent";
import UserProfileContainer from "./UserProfileContainer";
import userProfileReducer from "../reducers/UserProfileReducer";
import UserLoginContainer from "./UserLoginContainer";
import WriteCommentComponent from "../components/WriteCommentComponent";
import WriteReviewComponent from "../components/WriteReviewComponent";
import RegisterContainer from "./RegisterContainer";
import userAuthenticationReducer from "../reducers/UserAuthenticationReducer";

const reducers = combineReducers({
  movieDetail: movieDetailReducer,
  userProfile: userProfileReducer,
  userAuthentication: userAuthenticationReducer
});

const store = createStore(reducers);

class MovieHomeContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
            <Route path="/"
                   exact={true}
                   render={(props) => <HomepageContainer
                     {...props}/>
                   }/>
            <Route path="/search/:criteria"
                   exact={true}
                   render={(props) => <SearchResultComponent
                     {...props}
                     criteria={props.match.params.criteria}
                   />
                   }/>
            <Route path="/login"
                   exact={true}
                   render={(props) =>
                     <UserLoginContainer
                       {...props}
                     />
                   }/>
            <Route
              path="/details/:movieId"
              exact={true}
              render={(props) =>
                <MovieDetailContainer
                  {...props}
                  movieId={props.match.params.movieId}/>
              }/>
            <Route
              path="/movies/:movieId/new_comment"
              exact={true}
              render={(props) =>
                <WriteCommentComponent
                  {...props}
                  movieId={props.match.params.movieId}
                  isLoggedInUser={true}/>
              }/>
            <Route
              path="/movies/:movieId/new_review"
              exact={true}
              render={(props) =>
                <WriteReviewComponent
                  {...props}
                  movieId={props.match.params.movieId}
                  isLoggedInUser={true}/>
              }/>
            <Route
              path="/profile/:userId"
              exact={true}
              render={(props) =>
                <UserProfileContainer
                  {...props}
                  userId={props.match.params.userId}/>
              }/>
            <Route
            path="/profile"
            exact={true}
            render={(props) =>
              <UserProfileContainer {...props}/>
            }/>
            <Route
              path="/register"
              exact={true}
              render={(props) =>
                <RegisterContainer {...props}
                                   isLoggedInUser={false}/>
              }/>

          </Router>
        </div>
      </Provider>
    );
  }
}

export default MovieHomeContainer;
