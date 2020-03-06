import React from "react";
import {USER_ICON_PATH} from "../../common/constants";

const UserItemComponent = ({user}) =>
  <div className="row mt-1 py-2 px-2">
    <div className="col-2">
      <img src={USER_ICON_PATH}
           className="rounded-circle mx-auto d-flex border p-3"
           height="80"
           width="80"
           alt="user icon"/>
    </div>
    <div className="col-10 pt-3">
      <a href={`/profile/${user.uid}`}
         className="font-weight-bold">{user.username}</a>
    </div>
  </div>


export default UserItemComponent