import PropTypes from 'prop-types';

import s from './ErrorView.module.css';

export default function ErrorView({ message }) {
  return (
    <div role="alert" className={s.wrapper}>
      <p className={s.text}>{message}</p>
    </div>
  );
}

ErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};
