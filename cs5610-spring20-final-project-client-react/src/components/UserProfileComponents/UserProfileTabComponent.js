import React from 'react'
import UserProfileInfoComponent from "./UserProfileInfoComponent";
import MovieItemComponent from "../SearchResultComponents/MovieItemComponent";
import MovieCommentItemComponent from "../MovieCommentItemComponent";
import UserItemComponent from "./UserItemComponent";
import MovieReviewItemComponent from "../MovieReviewItemComponent";

const UserProfileTabComponent = ({user, updateUser}) =>
  <div className="mt-5">
    <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
        <a className="nav-item nav-link active" data-toggle="tab" href="#nav-profile" role="tab">
          Profile
        </a>
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-favorites" role="tab">
          Favorites
        </a>
        {user.role === "regular" &&
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-following" role="tab">
          Following
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
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-likes" role="tab">
          Likes
        </a>
      </div>
    </nav>
    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active" id="nav-profile" role="tabpanel">
        <UserProfileInfoComponent
          user={user}
        updateUser={updateUser}/>
      </div>
      <div className="tab-pane fade show" id="nav-favorites" role="tabpanel">
        {user.favorites && user.favorites.map(movie =>
          <MovieItemComponent
            movie={movie}
            key={movie.id}/>
        )}
      </div>
      <div className="tab-pane fade show" id="nav-following" role="tabpanel">
        {user.following && user.following.map(f =>
          <UserItemComponent
            user={f}
            key={f.uid}
          />
        )}
      </div>
      <div className="tab-pane fade show" id="nav-followers" role="tabpanel">
        {user.followers && user.followers.map(f =>
          <UserItemComponent
            user={f}
            key={f.uid}
          />
        )}
      </div>
      <div className="tab-pane fade show" id="nav-comments" role="tabpanel">
        {user.comments && user.comments.map(comment =>
          <MovieCommentItemComponent
            isInProfile={true}
            comment={comment}
            key={comment.cid}/>
        )}
      </div>
      <div className="tab-pane fade show" id="nav-reviews" role="tabpanel">
        {user.reviews && user.reviews.map(review =>
          <MovieReviewItemComponent
            isInProfile={true}
            review={review}
            key={review.rid}/>
        )}
      </div>
      <div className="tab-pane fade show" id="nav-likes" role="tabpanel">
        Liked Reviews
      </div>
    </div>
  </div>


export default UserProfileTabComponent
