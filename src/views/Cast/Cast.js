import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorView from '../../Components/ErrorView/ErrorView';
import Loader from '../../Components/Loader/Loader';
import styles from './Cast.module.css';
import { toast } from 'react-toastify';

import * as apiService from '../../services/films-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Cast() {
  const { movieId } = useParams();
  const [casts, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    apiService
      .getMovieCredits(movieId)
      .then(({ cast }) => {
        if (cast.length === 0) {
          toast.error('There are no casts for this movie ');
          return;
        }
        setCast(cast);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError('Something went wrong. Try again.');
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {Status.Pending && <Loader />}
      {status === Status.REJECTED && <ErrorView message={error} />}

      <ul className={styles.cast}>
        {status === Status.RESOLVED &&
          casts.map(cast => (
            <li key={cast.id} className={styles.item}>
              <img
                className={styles.photo}
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                    : alert("Not found")
                }
                alt={cast.name}
              />
              <h2 className={styles.name}>{cast.name}</h2>
              <p className={styles.character}>{cast.character}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
