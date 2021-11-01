
import errorImg from '../../img/error.jpg';

import PropTypes from 'prop-types';

import s from './ErrorView.module.css';

export default function ErrorView({ message }) {
  return (
    <div role="alert" className={s.wrapper}>
      <img src={errorImg} width="500" alt="Error" className={s.errorImg} />
      <p className={s.text}>{message}</p>
    </div>
  );
}

ErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};
