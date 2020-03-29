import React from 'react'
import UserProfileInfoComponent from "./UserProfileInfoComponent";
import MovieItemComponent from "../SearchResultComponents/MovieItemComponent";
import MovieCommentItemComponent from "../MovieCommentItemComponent";
import UserItemComponent from "./UserItemComponent";
import MovieReviewItemComponent from "../MovieReviewItemComponent";
import {CRITIC_USER, REGULAR_USER} from "../../common/constants";
const store = require('store');

const UserProfileTabComponent = ({user, updateUser}) =>
  <div className="mt-5">
    <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
        {store.get('currUser')._id === user._id &&
         <a className="nav-item nav-link active" data-toggle="tab" href="#nav-profile" role="tab">
          Profile
        </a>
        }
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-favorites" role="tab">
          Favorites
        </a>
        {user.role === REGULAR_USER &&
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-following" role="tab">
          Following
        </a>
        }
        {user.role === CRITIC_USER &&
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-followers" role="tab">
          Followers
        </a>
        }
        {user.role === "REGULAR" &&
        <a className="nav-item nav-link" data-toggle="tab" href="#nav-comments" role="tab">
          Comments
        </a>
        }
        {user.role === CRITIC_USER &&
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
      {store.get('currUser')._id === user._id &&
       <div className="tab-pane fade show active" id="nav-profile" role="tabpanel">
         <UserProfileInfoComponent
           user={user}
           updateUser={updateUser}/>
       </div>
      }
      <div className="tab-pane fade show" id="nav-favorites" role="tabpanel">
        {user.favorites && user.favorites.map(movie =>
          <MovieItemComponent
            movie={movie}
            key={movie.id}/>
        )}
      </div>
      <div className="tab-pane fade show" id="nav-following" role="tabpanel">
        {user.follows && user.follows.map(follow =>
          <UserItemComponent
            user={follow}
            key={follow.userId}
          />
        )}
      </div>
      <div className="tab-pane fade show" id="nav-followers" role="tabpanel">
        {user.followedBy && user.followedBy.map(follower =>
          <UserItemComponent
            user={follower}
            key={follower.userId}
          />
        )}
      </div>
      <div className="tab-pane fade show" id="nav-comments" role="tabpanel">
        {user.ratingAndCommentsOrReviews && user.ratingAndCommentsOrReviews.map(comment =>
          <MovieCommentItemComponent
            isInProfile={true}
            comment={comment}
            key={comment._id}/>
        )}
      </div>

      <div className="tab-pane fade show" id="nav-reviews" role="tabpanel">
        {user.ratingAndCommentsOrReviews && user.ratingAndCommentsOrReviews.map(review =>
          <MovieReviewItemComponent
            isInProfile={true}
            review={review}
            key={review._id}/>
        )}
      </div>

      {/*//TODO: need to fetch the likedReviews for user, for the user object only has the id*/}
      <div className="tab-pane fade show" id="nav-likes" role="tabpanel">
        {user.likedReviews && user.likedReviews.map(review =>
          <MovieReviewItemComponent
            isInProfile={true}
            review={review}
            key={review._id}/>
        )}
      </div>
    </div>
  </div>;


export default UserProfileTabComponent
