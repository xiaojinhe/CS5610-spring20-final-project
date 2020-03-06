import React from 'react'
import UserProfileInfoComponent from "./UserProfileInfoComponent";
import MovieItemComponent from "../SearchResultComponents/MovieItemComponent";
import MovieCommentItemComponent from "../MovieCommentItemComponent";
import UserItemComponent from "./UserItemComponent";

const UserProfileTabComponent = ({user}) =>
  <div className="mt-5">
    <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
        <a className="nav-item nav-link active" data-toggle="tab" href="#nav-profile" role="tab">
          Profile
        </a>
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-likes" role="tab">
          Likes
        </a>
        {user.role === "regular" &&
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-follows" role="tab">
          Follows
        </a>
        }
        {user.role === "critic" &&
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-followers" role="tab">
          Followers
        </a>
        }
        {user.role === "regular" &&
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-comments" role="tab">
          Comments
        </a>
        }
        {user.role === "critic" &&
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-reviews" role="tab">
          Reviews
        </a>
        }
      </div>
    </nav>
    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active" id="nav-profile" role="tabpanel">
        <UserProfileInfoComponent
          user={user}/>
      </div>
      <div className="tab-pane fade show" id="nav-likes" role="tabpanel">
        {user.movieLikes && user.movieLikes.map(movie =>
          <MovieItemComponent
            movie={movie}
            key={movie.id}/>
        )}
      </div>
      <div className="tab-pane fade show" id="nav-follows" role="tabpanel">
        {user.follows && user.follows.map(f =>
          <UserItemComponent
            user={f}
          />
        )}
      </div>
      <div className="tab-pane fade show" id="nav-followers" role="tabpanel">
        {user.followers && user.followers.map(f =>
          <UserItemComponent
            user={f}
          />
        )}
      </div>
      <div className="tab-pane fade show" id="nav-comments" role="tabpanel">
        {user.comments && user.comments.map(comment =>
          <MovieCommentItemComponent
            comment={comment}
            key={comment.id}/>
        )}
      </div>
      <div className="tab-pane fade show" id="nav-reviews" role="tabpanel">
        Reviews
      </div>
    </div>
  </div>


export default UserProfileTabComponent
