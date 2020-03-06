import React from 'react'

const UserProfileHeaderComponent = ({user, isLoggedInUser}) =>
  <div>
    <h2>{user.username}</h2>
    {user.role === "regular" &&
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <div>
          <h2 className="font-weight-bold">{user.follows.length}</h2>
          <div>
            <small>Following</small>
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-6">
        <div>
          <h2 className="font-weight-bold">{user.comments.length}</h2>
          <div>
            <small>Comments</small>
          </div>
        </div>
      </div>

    </div>
    }
    {user.role === "critic" &&
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <div>
          <h2 className="font-weight-bold">{user.followers.length}</h2>
          <div>
            <small>Followers</small>
          </div>
          {!isLoggedInUser &&
          <button className="btn btn-success btn-block">
            Follow
          </button>
          }
        </div>
      </div>
      <div className="col-xs-12 col-sm-6">
        <div>
          <h2 className="font-weight-bold">{user.reviews.length}</h2>
          <div>
            <small>Reviews</small>
          </div>
        </div>
      </div>
    </div>}
  </div>;

export default UserProfileHeaderComponent
