import React from "react";

import "./App.scss";
import MovieDetails from './components/MovieDetails';
import data from "./topMovies.json";

export const App = () => {
  return (
    <div>
      <MovieDetails data={data}/>
    </div>
  );
};

export default App;
