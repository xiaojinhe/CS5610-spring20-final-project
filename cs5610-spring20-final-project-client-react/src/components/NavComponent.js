import React from "react";
import {Link} from "react-router-dom";

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
        if (criteria.length > 0) {
            this.props.history.push(`/search/${criteria}`)
        }
        this.clearInputField()
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.performSearch();
        }
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">MovieTime</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto pl-2">
                        <li className="nav-item">
                            {/*TODO: change to real link*/}
                            <Link className="nav-link p-0" to="/profile/1"><i className="far fa-user-circle fa-2x pt-1"/></Link>
                        </li>
                        {/*TODO: Hide this tab when user has logged in*/}
                        <li className="nav-item d-flex ml-2 align-items-center">
                            <Link className="nav-link p-0" to="/login">Login</Link>
                        </li>
                    </ul>

                    {this.props.enableSearch &&
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"
                               onChange={this.updateInputField}
                               onKeyDown={this.handleKeyDown}/>
                        <button className="btn btn-outline-success my-2 my-sm-0"
                                type="button"
                                onClick={this.performSearch}>
                            Search
                        </button>
                    </form>
                    }
                </div>
            </nav>
        )

    }
}

export default NavComponent