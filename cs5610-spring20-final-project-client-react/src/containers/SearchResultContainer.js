import {setSearchResultAction} from "../actions/SearchActions";
import {connect} from "react-redux";
import SearchResultComponent from "../components/SearchResultComponents/SearchResultComponent";

const stateToPropertyMapper = (state) => ({
  results: state.searchResults.searchResults
});

const dispatchToPropertyMapper = (dispatch) => ({
  setSearchResult: (results) => {
    dispatch(setSearchResultAction(results))
  }
});

const SearchResultContainer = connect(stateToPropertyMapper,
  dispatchToPropertyMapper)(SearchResultComponent)

export default SearchResultContainer
