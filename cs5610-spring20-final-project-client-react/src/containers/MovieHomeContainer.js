import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomepageComponent from "../components/HomepageComponent";

class MovieHomeContainer extends React.Component {

    render() {
        return (
            <Router>
                <Route path="/"
                       exact={true}
                       render={(props) => <HomepageComponent
                           {...props}/>}/>
            </Router>
        )
    }
}

export default MovieHomeContainer