import {connect} from "react-redux";
import UserProfileComponent from "../components/UserProfileComponents/UserProfileComponent";

const stateToPropertyMapper = (state) => ({
});

const dispatchToPropertyMapper = (dispatch) => ({
});

const MovieDetailContainer = connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(UserProfileComponent);

export default MovieDetailContainer

