import {connect} from "react-redux";
import UserProfileComponent from "../components/UserProfileComponents/UserProfileComponent";
import UserService from "../services/UserService";
import {
  deleteCommentAction,
  deleteReviewAction,
  findUserByIdAction,
  followUserAction,
  unfollowUserAction,
  updateUserAction
} from "../actions/UserProfileAction";
import ReviewService from "../services/ReviewService";
import CommentService from "../services/CommentService";

const store = require('store');

const stateToPropertyMapper = (state) => ({
  user: state.userProfile.user
});

const dispatchToPropertyMapper = (dispatch) => ({
  findUserById: (userId) => {
    UserService.findUserById(userId)
      .then(user => dispatch(findUserByIdAction(user)));
  },
  updateUser: (userId, user) => {
    UserService.updateUser(userId, user)
      .then(response => {
        if (response.status === 200) {
          alert("Successully update your profile!");
          store.set('currUser', user);
          dispatch(updateUserAction(user));
        }
      })
  },
  followUser: (userId, userToFollow) => {
    UserService.followUser(userId, userToFollow)
      .then(response => {
        if (response.status === 200) {
          const currUser = store.get('currUser');
          currUser.follows.push(userToFollow);
          dispatch(followUserAction({userId: userId, username: currUser.username, avatarURL: currUser.avatarURL}));
        }
      })
  },
  unfollowUser: (userId, criticId) => {
    UserService.unfollowUser(userId, criticId)
      .then(response => {
        if (response.status === 200) {
          const currUser = store.get('currUser');
          currUser.follows = currUser.follows.filter(f => f.userId !== criticId);
          dispatch(unfollowUserAction(userId));
        }
      })
  },
  getCurrentUser: () => {
    UserService.getCurrentUser().then(user => {
      store.set('currUser', user);
      dispatch(findUserByIdAction(user));
    });
  },
  deleteReview: (reviewId) => {
    ReviewService.deleteReview(reviewId)
        .then((response) => {
          const currUser = store.get('currUser');
          currUser.ratingAndCommentsOrReviews =
              currUser.ratingAndCommentsOrReviews.filter(r => r._id !== reviewId);
            currUser.likedReviews =
                currUser.likedReviews.filter(rid => rid !== reviewId);
          dispatch(deleteReviewAction(reviewId));
        })
  },
  deleteComment: (commentId) => {
    CommentService.deleteComment(commentId)
        .then((response) => {
          const currUser = store.get('currUser');
          currUser.ratingAndCommentsOrReviews =
              currUser.ratingAndCommentsOrReviews.filter(c => c._id !== commentId);
          dispatch(deleteCommentAction(commentId));
        })
  }
});

const UserProfileContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(UserProfileComponent);

export default UserProfileContainer

