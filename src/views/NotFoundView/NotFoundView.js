import styles from './NotFoundView.module.css';
import errorImg from '../../img/error.jpg';

export default function NotFoundView() {
  return (
    <div className={styles.main}>
      <img className={styles.img} src={errorImg} width="650" alt="Page not found" />
      <h1 className={styles.title}>404 Page not found</h1>
    </div>
  );
}
