import notFoundImg from '../../img/notFound.png';
import styles from '../../views/HomePage/HomePage.module.css';
import { Link, useLocation } from "react-router-dom";

const MoviesList = ({ movies }) => {
    const moviesListNotEmpty = movies.length !== 0;
    const location = useLocation();

    return (
        <ul className={styles.movieGallery}>
            {moviesListNotEmpty &&
                movies.map(movie => (
                    <li key={movie.id} className={styles.movieGalleryItem}>
                        <Link to={{
                            pathname: `/movies/${movie.id}`,
                            state: { from: location },
                        }}>
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
                ))
            }
        </ul >
    )
};

export default MoviesList;