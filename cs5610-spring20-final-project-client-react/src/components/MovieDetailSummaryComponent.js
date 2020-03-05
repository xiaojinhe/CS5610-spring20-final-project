import React from "react";

const getMovieReleaseYear = (release_date) => release_date.split("-")[0];

const MovieDetailSummaryComponent = ({movie}) =>
  <div>
    {movie.homepage ?
     <h2 className="font-weight-bold"><a href={movie.homepage}>{movie.title} ({getMovieReleaseYear(movie.release_date)})</a></h2> :
     <h2 className="font-weight-bold">{movie.title} ({getMovieReleaseYear(movie.release_date)})</h2>
    }
    <div>
      {movie.directors.length > 1 ?
       <h6><b>Directors</b>: {movie.directors.join(", ")}</h6> : <h6><b>Director</b>: {movie.directors}</h6>}
      {movie.writers.length > 1 ?
       <h6><b>Writers</b>: {movie.writers.join(", ")}</h6> : <h6><b>Writer</b>: {movie.writers}</h6>}
      {movie.stars.length > 1 ?
       <h6><b>Stars</b>: {movie.stars.map(cast => cast.name).join(", ")}</h6> : <h6><b>Star</b>: {movie.stars.map(cast => cast.name)}</h6>}
      {movie.genres.length > 1 ?
       <h6><b>Genres</b>: {movie.genres.map(genre => genre.name).join(" | ")}</h6> : <h6><b>Genre</b>: {movie.genres.map(genre => genre.name)}</h6>}
      {movie.spoken_languages.length > 1 ?
       <h6><b>Languages</b>: {movie.spoken_languages.map(l => l.name).join(" | ")}</h6> : <h6><b>Language</b>: {movie.spoken_languages.map(l => l.name)}</h6>}
      <h6><b>Release Date</b>: {movie.release_date}</h6>
      {movie.runtime && <h6><b>Runtime</b>: {movie.runtime} mins</h6>}
      <h6><b>Popularity</b>: {movie.popularity}</h6>
    </div>
  </div>;

export default MovieDetailSummaryComponent;
