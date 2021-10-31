import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as apiService from '../../services/films-api';
import styles from './HomePage.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorView from '../../components/ErrorView/ErrorView';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export default function HomePage() {
  const { url } = useRouteMatch();

  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    apiService
      .getTrendingFilms()
      .then(({ results }) => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError('Something went wrong. Try again.');
        setStatus(Status.REJECTED);
      });
  }, []);

  return (
    <>
      <h2 className={styles.title}>Trending today</h2>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorView message={error.message} />}

      {status === Status.RESOLVED && (
        <ul className={styles.movieGallery}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.movieGalleryItem}>
              <Link to={`${url}movies/${movie.id}`}>
                <img
                  className={styles.movieGalleryItemImage}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : alert ("Not found")
                  }
                  alt={movie.title}
                />
                <p className={styles.movieTitle}>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}