import React from 'react';
import {TMDB_IMAGE_URL} from "../common/constants";

const CastCardComponent = ({key, object}) =>
  <div className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 mb-2">
    <div className="card">
      <div key={key}
           className="card crew-cast-card">
        <img src={TMDB_IMAGE_URL(185, object.profile_path)}
             className="card-img"
             alt="Card" />
        <div className="card-body">
          <p>{object.name}</p>
          <p>{object.character}</p>
        </div>
      </div>
    </div>
  </div>;


export default CastCardComponent;