import {connect} from "react-redux";
import UserProfileComponent from "../components/UserProfileComponents/UserProfileComponent";
import UserService from "../services/UserSerivce";
import {findUserByIdAction} from "../actions/UserProfileAction";

const stateToPropertyMapper = (state) => ({
    user: state.userProfile.user
});

const dispatchToPropertyMapper = (dispatch) => ({
    findUserById: (userId) => {
        const user = UserService.findUserById(userId);
        dispatch(findUserByIdAction(user))
    }
});

const UserProfileContainer = connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(UserProfileComponent);

export default UserProfileContainer
