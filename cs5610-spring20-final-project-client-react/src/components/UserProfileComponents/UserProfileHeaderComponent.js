import React from 'react'
import {CRITIC_USER, REGULAR_USER, USER_ICON_PATH} from "../../common/constants";
import "./userProfile.css"

const UserProfileHeaderComponent = ({user, isCurrentUserProfile, isFollowedBy, followUser, unfollowUser}) =>

  <div className="card bg-light mt-5">
    <div className="card-body">
      <div className="text-center">
        <img src={user.avatarURL ? user.avatarURL : USER_ICON_PATH}
             className={`rounded-circle user-icon border 
             ${user.avatarURL? "" : "p-3"}`}
             alt="user icon"/>
        <div className="d-inline-block user-role px-2 py-1
                        rounded text-capitalize text-white bg-success">
          {user.role.toLowerCase()}
        </div>
      </div>
      <div className="row mt-3">
        <h4
          className={`my-auto ${!isCurrentUserProfile && user.role === CRITIC_USER ? "ml-auto" : "mx-auto"}`}>
          {user.username}
        </h4>
        {!isCurrentUserProfile && user.role === CRITIC_USER &&
        <div className="ml-2 mr-auto my-auto">
          {isFollowedBy ?
            <button className="btn btn-outline-secondary"
                    onClick={unfollowUser}>
              <i className="fa fa-check"/> Followed
            </button> :

            <button className="btn btn-info"
                    onClick={followUser}>
              <i className="fa fa-plus"/> Follow
            </button>
          }
        </div>
        }
        {/*{*/}
        {/*  user.role === REGULAR_USER && enableEditProfile &&*/}
        {/*  <Link to="/profile/edit" className="ml-2 btn btn-info mr-auto my-auto">*/}
        {/*    Edit <i className="fa fa-pencil-alt"/>*/}
        {/*  </Link>*/}
        {/*}*/}
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
          <div className="col-6">
            <div>
              <h2 className="text-center font-weight-bold">{user.followedBy.length}</h2>
              <div className="text-center">Followers</div>
            </div>
          </div>
          <div className="col-6">
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
