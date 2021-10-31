import { lazy, Suspense } from 'react';
import Loader from './Components/Loader/Loader';

import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from './Components/AppBar/AppBar';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);

const MoviesPage = lazy(() =>
  import('./views/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);

const NotFoundView = lazy(() =>
  import(
    './views/NotFoundView/NotFoundView' /* webpackChunkName: "not-found-view" */
  ),
);

const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

export default function App() {
  return (
    <div>
      <ToastContainer autoClose={2000} />
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
