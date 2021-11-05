import { useState, useEffect } from 'react';
import * as apiService from '../../services/films-api';
import styles from './HomePage.module.css';
import Loader from '../../Components/Loader/Loader';
import ErrorView from '../../Components/ErrorView/ErrorView';
import MoviesList from '../../Components/MoviesList/MoviesList'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export default function HomePage() {

  const [movies, setMovies] = useState([]);
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

  const moviesListNotEmpty = movies.length !== 0;

  return (
    <>
      <h2 className={styles.title}>Trending today</h2>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorView message={error.message} />}

      {status === Status.RESOLVED && (
        moviesListNotEmpty && <MoviesList movies={movies} />
      )}
    </>
  );
}