import React from 'react'
import UserProfileInfoComponent from "./UserProfileInfoComponent";

const UserProfileTabComponent = ({user}) =>
  <div className="container">
    <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
        <a className="nav-item nav-link active" data-toggle="tab" href="#nav-profile" role="tab">
          Profile
        </a>
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-likes" role="tab">
          Likes
        </a>
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-follows" role="tab">
          Follows
        </a>
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-followers" role="tab">
          Followers
        </a>
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-comments" role="tab">
          Comments
        </a>
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-reviews" role="tab">
          Reviews
        </a>
      </div>
    </nav>
    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active" id="nav-profile" role="tabpanel">
        <UserProfileInfoComponent
          user={user}/>
      </div>
      <div className="tab-pane fade show" id="nav-likes" role="tabpanel">
        Likes
      </div>
      <div className="tab-pane fade show" id="nav-follows" role="tabpanel">
        Follows
      </div>
      <div className="tab-pane fade show" id="nav-followers" role="tabpanel">
        Followers
      </div>
      <div className="tab-pane fade show" id="nav-comments" role="tabpanel">
        Comments
      </div>
      <div className="tab-pane fade show" id="nav-reviews" role="tabpanel">
        Reviews
      </div>
    </div>
  </div>


export default UserProfileTabComponent
