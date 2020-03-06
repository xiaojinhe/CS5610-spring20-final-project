import React from 'react'
import {USER_ICON_PATH} from "../../common/constants";
import "./userProfile.css"

const UserProfileHeaderComponent = ({user, isLoggedInUser}) =>

  <div className="card bg-light mt-5">
    <div className="card-body">
      <img src={USER_ICON_PATH}
           className="rounded-circle user-icon mx-auto d-flex border p-3"
           alt="user icon"/>
      <div className="row mt-3">
        <h4 className="ml-auto my-auto">{user.username}</h4>
        {!isLoggedInUser &&
        <button className="ml-2 btn btn-info mr-auto my-auto">
          Follow <i className="fa fa-plus"/>
        </button>
        }
      </div>
      <div className="mt-3">
        {user.role === "regular" &&
        <div className="row">
          <div className="col-6">
            <div>
              <h2 className="text-center font-weight-bold">{user.follows.length}</h2>
              <div className="text-center">Following</div>
            </div>
          </div>
          <div className="col-6">
            <div className="">
              <h2 className="text-center font-weight-bold">{user.comments.length}</h2>
              <div className="text-center">Comments</div>
            </div>
          </div>

        </div>
        }
        {user.role === "critic" &&
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div>
              <h2 className="text-center font-weight-bold">{user.followers.length}</h2>
              <div className="text-center">Followers</div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div>
              <h2 className="text-center font-weight-bold">{user.reviews.length}</h2>
              <div className="text-center">Reviews</div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  </div>;

export default UserProfileHeaderComponent
