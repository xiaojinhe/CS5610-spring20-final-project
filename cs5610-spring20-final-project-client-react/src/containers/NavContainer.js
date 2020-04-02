import {setSearchResultAction} from "../actions/SearchActions";
import {connect} from "react-redux";
import NavComponent from "../components/NavComponent";

const stateToPropertyMapper = (state) => ({});

const dispatchToPropertyMapper = (dispatch) => ({
  setSearchResult: (results) => {
    dispatch(setSearchResultAction(results))
  }
});

const NavContainer =  connect(stateToPropertyMapper,
  dispatchToPropertyMapper)(NavComponent);

export default NavContainer
