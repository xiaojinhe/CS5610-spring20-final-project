import React from 'react';
import {TMDB_IMAGE_URL} from "../../common/constants";

const CastCardComponent = ({object}) =>
  <div className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 mb-2">
    <div className="card border-0">
      <div className="card crew-cast-card">
        <img src={TMDB_IMAGE_URL(185, object.profile_path)}
             className="card-img"
             alt="Card" />
        <div className="card-body p-0 text-center">
          <small>{object.name} ({object.character})</small>
        </div>
      </div>
    </div>
  </div>;


export default CastCardComponent;