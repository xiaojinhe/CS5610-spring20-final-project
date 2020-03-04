import React from "react";

class NavComponent extends React.Component {
    state = {
        searchCriteria: ''
    }

    updateInputField = event =>
        this.setState({
                          searchCriteria: event.target.value
                      })

    clearInputField = () => {
        this.setState({
                          searchCriteria: ''
                      })
    }

    performSearch = () => {
        const criteria = this.state.searchCriteria.trim()
        if (criteria.length > 0) {
            this.props.search(criteria)
        }
        this.clearInputField()
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">MovieHome</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"
                               onChange={this.updateInputField}/>
                        <button className="btn btn-outline-success my-2 my-sm-0"
                                type="button" onClick={this.performSearch}>
                            Search
                        </button>
                    </form>
                </div>
            </nav>
        )

    }
}

export default NavComponent