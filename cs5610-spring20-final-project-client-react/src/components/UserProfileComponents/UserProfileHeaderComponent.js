import React from 'react'
import {CRITIC_USER, REGULAR_USER, USER_ICON_PATH} from "../../common/constants";
import "./userProfile.css"
import {Link} from "react-router-dom";

const enableEditProfile = true;
const UserProfileHeaderComponent = ({user, followUser}) =>

  <div className="card bg-light mt-5">
    <div className="card-body">
      <img src={user.avatarURL ? user.avatarURL : USER_ICON_PATH}
           className="rounded-circle user-icon mx-auto d-flex border p-3"
           alt="user icon"/>
      <div className="row mt-3">
        <h4
          className={`my-auto ${user.role === CRITIC_USER || enableEditProfile ? "ml-auto" : "mx-auto"}`}>{user.username}</h4>
        {/*//todo: hide the follow button for three situation:
        (1) the logged in user is viewing his own profile
        (2) if the profile belongs to a regular user
        (3) if the profile is viewing by anonymous user*/}
        {user.role === CRITIC_USER &&
        <button className="ml-2 btn btn-info mr-auto my-auto">
          Follow <i className="fa fa-plus"/>
        </button>
        }
        {/*//todo: show this button only when user,
        right now just assume the regular user is logged in user to make UI consistent*/}
        {
          user.role === REGULAR_USER && enableEditProfile &&
          <Link to="/profile/edit" className="ml-2 btn btn-info mr-auto my-auto">
            Edit <i className="fa fa-pencil-alt"/>
          </Link>
        }
      </div>
      <div className="mt-3">
        {user.role === REGULAR_USER &&
        <div className="row">
          <div className="col-6">
            <div>
              <h2 className="text-center font-weight-bold">{user.follows.length}</h2>
              <div className="text-center">Following</div>
            </div>
          </div>
          <div className="col-6">
            <div className="">
              <h2 className="text-center font-weight-bold">{user.ratingAndCommentsOrReviews.length}</h2>
              <div className="text-center">Comments</div>
            </div>
          </div>
        </div>
        }
        {user.role === CRITIC_USER &&
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div>
              <h2 className="text-center font-weight-bold">{user.followedBy.length}</h2>
              <div className="text-center">Followers</div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div>
              <h2 className="text-center font-weight-bold">{user.ratingAndCommentsOrReviews.length}</h2>
              <div className="text-center">Reviews</div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  </div>;

export default UserProfileHeaderComponent
