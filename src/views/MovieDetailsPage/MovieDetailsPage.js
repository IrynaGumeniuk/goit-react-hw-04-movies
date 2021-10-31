import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, NavLink, useRouteMatch, Route, Switch } from 'react-router-dom';
import * as apiService from '../../services/films-api';
import styles from './MovieDetailsPage.module.css';

import ErrorView from '../../Components/ErrorView/ErrorView';
import Loader from '../../Components/Loader/Loader';

const Cast = lazy(() =>
  import('../Cast/Cast' /* webpackChunkName: "cast-page" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: "reviews-page" */),
);

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    apiService
      .getFullFilmInfo(movieId)
      .then(({ poster_path, original_title, popularity, overview, genres }) => {
        setMovie({
          src: poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : alert("Not found"),
          title: original_title,
          score: popularity.toFixed(1),
          overview,
          genres,
        });
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error.message);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorView message={error} />}
      {status === Status.RESOLVED && (
        <>
          <div className={styles.wrapper}>
            <img className={styles.poster} src={movie.src} alt={movie.title} />
            <div className={styles.description}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <h3 className={styles.movieScore}>User Score</h3>
              <p>{movie.score}</p>
              <h3 className={styles.movieOverview}>Overview</h3>
              <p>{movie.overview}</p>
              <h3 className={styles.movieGenres}>Genres</h3>
              <ul>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <nav className={styles.linkNav}>
            <NavLink
              to={`${url}/cast`}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Cast
            </NavLink>
            <NavLink
              to={`${url}/reviews`}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Reviews
            </NavLink>
          </nav>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path={`${path}/cast`}>
                <Cast />
              </Route>

              <Route path={`${path}/reviews`}>
                <Reviews />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}
