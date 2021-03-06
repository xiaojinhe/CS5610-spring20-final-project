import React from "react";
import {Link} from "react-router-dom";
import UserService from "../services/UserService";
import MovieService from "../services/MovieService";

const store = require('store');

class NavComponent extends React.Component {
    state = {
        searchCriteria: ''
    };

    updateInputField = event =>
        this.setState({
            searchCriteria: event.target.value
        });

    clearInputField = () => {
        this.setState({
            searchCriteria: ''
        })
    };

    performSearch = () => {
        const criteria = this.state.searchCriteria.trim();
        this.clearInputField();
        if (criteria.length > 0) {
            MovieService.searchMovies(criteria)
                .then(response => {
                        if (response.results && response.results.length > 0) {
                            this.props.setSearchResult(response.results);
                            this.props.history.push(`/search/${criteria}`)
                        } else {
                            alert("No result found!")
                        }
                    }
                )
        }
    };

    logout = () => {
        UserService.logout()
          .then(response => {
              if (response.status === 200) {
                  store.remove('currUser');
                  this.props.history.push('/logout');
                  this.props.history.push('/');
              }
          })
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.performSearch();
        }
    };

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <a className="navbar-brand" href="/">MovieTime</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto pl-2">
                        {store.get('currUser') &&
                            <li className="nav-item">
                                <Link className="nav-link p-0" to="/profile"><i className="far fa-user-circle fa-2x pt-1"/></Link>
                            </li>
                        }
                        {store.get('currUser') &&
                            <li className="nav-item d-flex ml-lg-3 align-items-center">
                                <a className="btn nav-link"
                                   onClick={this.logout}>
                                  Logout
                                </a>
                            </li>
                        }
                        {!store.get('currUser') &&
                            <li className="nav-item d-flex ml-3 align-items-center">
                                <Link className="nav-link p-0" to="/login">Login</Link>
                            </li>
                        }
                        <li className="nav-item d-flex ml-3 align-items-center">
                            <Link className="nav-link p-0" to="/privacy">Privacy Policy</Link>
                        </li>
                    </ul>

                    {this.props.enableSearch &&
                    <div className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"
                               onChange={this.updateInputField}
                               onKeyDown={this.handleKeyDown}
                               value={this.state.searchCriteria}/>
                        <button className="btn btn-outline-success my-2 my-sm-0"
                                type="button"
                                onClick={this.performSearch}>
                            Search
                        </button>
                    </div>
                    }
                </div>
            </nav>
        )

    }
}

export default NavComponent

