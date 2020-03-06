import {connect} from "react-redux";
import UserProfileComponent from "../components/UserProfileComponents/UserProfileComponent";

const stateToPropertyMapper = (state) => ({
});

const dispatchToPropertyMapper = (dispatch) => ({
});

const UserProfileContainer = connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(UserProfileComponent);

export default UserProfileContainer

