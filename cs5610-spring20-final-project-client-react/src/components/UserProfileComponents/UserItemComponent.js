import React from "react";
import {USER_ICON_PATH} from "../../common/constants";

const UserItemComponent = ({user}) =>
  <div className="row mt-1 py-2">
    <div className="col-2 col-lg-1">
      <img src={USER_ICON_PATH}
           className="rounded-circle mx-1 d-flex border p-3 w-100 h-100"
           alt="user icon"/>
    </div>
    <div className="col-10 col-lg-11 pt-2">
      <a href={`/profile/${user.userId}`}
         className="font-weight-bold">{user.username}</a>
    </div>
  </div>;

export default UserItemComponent;
