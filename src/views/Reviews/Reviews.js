import ShowMore from 'react-simple-show-more';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './Reviews.module.css';
import Loader from '../../Components/Loader/Loader';
import * as apiService from '../../services/films-api';
import ErrorView from '../../Components/ErrorView/ErrorView';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    apiService
      .getMovieReviews(movieId)
      .then(({ results }) => {
        if (results.length === 0) {
          toast.error('There are no reviews for this movie ');
          setStatus(Status.IDLE);
          return;
        }
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError('Something went wrong. Try again.');
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorView message={error} />}
      {status === Status.RESOLVED && (
        <ul>
          {reviews.map(review => (
            <li key={review.id} className={styles.review}>
              <h2 className={styles.reviewAuthor}>Author: {review.author}</h2>
              <p className={styles.reviewContent}>
                <ShowMore
                  text={review.content}
                  length={170}
                  showMoreLabel="Show more"
                  showLessLabel="Show less"
                  style={{
                    cursor: 'pointer',
                    color: 'green',
                    fontWeight: 'bold',
                  }}
                />
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
