import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from '../HomePage/HomePage.module.css';
import Searchbar from '../../Components/Searchbar/Searchbar';
import * as apiService from '../../services/films-api';
import notFoundImg from '../../img/notFound.png';
import Loader from '../../Components/Loader/Loader';
import ErrorView from '../../Components/ErrorView/ErrorView';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const { url } = useRouteMatch();

  useEffect(() => {
    if (!searchQuery) return;

    setStatus(Status.PENDING);

    apiService
      .getFilmsBySearchQuery(searchQuery)
      .then(({ results }) => {
        if (results.length === 0) {
          setError(`No results were found for ${searchQuery}!`);
          setStatus(Status.REJECTED);
          return;
        }
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery]);

  const onChangeQuery = newQuery => {
    if (searchQuery === newQuery) {
      return;
    }
    setSearchQuery(newQuery);
    setError(null);
    setStatus(Status.IDLE);
  };

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} />
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorView message={error} />}
      {status === Status.RESOLVED && (
        <ul className={styles.movieGallery}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.movieGalleryItem}>
              <Link to={`${url}/${movie.id}`}>
                <img
                  className={styles.movieGalleryItemImage}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : notFoundImg
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
