import React from "react";

const UserItemComponent = ({user}) =>
  <div className="row mt-1 px-3">
    <a href={`/profile/${user.uid}`}
       className="font-weight-bold">{user.username}</a>
  </div>


export default UserItemComponent