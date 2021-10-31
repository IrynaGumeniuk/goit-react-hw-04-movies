import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleNameChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return toast.error('Please enter some value');
    }

    onSubmit(query);

    setQuery('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles.searchFormButton}>
        <span className={styles.searchFormButtonLabel}>Search</span>
      </button>

      <input
        className={styles.searchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={query}
        onChange={handleNameChange}
      />
    </form>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
