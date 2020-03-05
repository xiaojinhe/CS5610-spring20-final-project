import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomepageComponent from "../components/HomepageComponent";
import SearchResultComponent from "../components/SearchResultComponents/SearchResultComponent";

class MovieHomeContainer extends React.Component {

    render() {
        return (
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
        )
    }
}

export default MovieHomeContainer